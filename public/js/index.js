// Get references to page elements
var $product = $("#product");
var $quantity = $("#quantity");
var $description = $("#description");
var $submitBtn = $("#submit");
var $shoppingList = $("#shopping-list");
var $recipe = $("#recipe");


function divclear() {
  $("#recipe-input").empty();
  $("#output").empty();
  
}



// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.qty + " " + example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-outline-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $shoppingList.empty();
    $shoppingList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $product.val().trim(),
    description: $description.val().trim(),
    qty: $quantity.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });
  $quantity.val("")
  $product.val("");
  $description.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  event.preventDefault();

  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$shoppingList.on("click", ".delete", handleDeleteBtnClick);



// google maps api code 

var map;

function createMap() {
  var options = {
    center: { lat: 41.896359, lng: -87.618844 },
    zoom: 10
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var input = document.getElementById('search');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });


    map.fitBounds(bounds);
  });
}



appID = "a712336a"



function searchRecipe(recipe) {


  // Querying the bandsintown api for the selected recipe, the ?app_id parameter is required, but can equal anything
  var queryURL = "https://api.edamam.com/search?q=" + recipe + "&app_id=" + appID + "&app_key=49812f2256558cc66aa8bc6fa569a5ed";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    // Printing the entire object to console
    console.log(response);
    if (response.hits.length == 0) {
      $("#output").append("<h5> No Recipes could be found</h5>");
    }

    for (var i = 0; i < 5; i++) {
      var recipe = response.hits[i].recipe;
      
      for(var n = 0; n <recipe.ingredients.length; n++){
      // console.log(JSON.stringify(recipe.ingredients[n].text));
  
       let ingredients = JSON.stringify(recipe.ingredients[n].text);
      // console.log(ingredients);
       JSON.parse(ingredients);
      console.log(ingredients);
      
      }
      var recipeName = recipe.label;
      var $recipeList = $("<ul>");
      $recipeList.addClass("list-group");
      $("#output").prepend($recipeList);
      var $recipeListItem = $("<li class='list-group-item recipeHeadline' style='margin-top: 20px;' class='recipelist'>");
      $recipeListItem.append(
        "<h6 class='label label-primary'>" +
        recipeName +
        "</h6>"
       
        );
     
      
      $recipeListItem.append("<a class='btn btn-outline-danger float-right' href='" + recipe.url + "' target = '_blank'>" + "get recipe" + "</a>");
      
   
      
      $recipeList.append($recipeListItem);

    }


    $("#recipe-div").empty();
    $("#recipe-div").append();
  });
}

// Event handler for user clicking the select-recipe button
$("#select-recipe").on("click", function (event) {
  divclear();
  $recipe.val("");
  // Preventing the button from trying to submit the form
  event.preventDefault();

  // Storing the recipe name
  var inputRecipe = $("#recipe-input").val().trim();

  // Running the searchRecipe function(passing in the recipe as an argument)
  searchRecipe(inputRecipe);
});

