// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);


var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 41.896359, lng: -87.618844 },
        zoom: 9
    });
   
    var marker = new google.maps.Marker({
     position: { lat: 41.896359, lng: -87.618844 },
    map: map,
     title: 'Hello World!'
 });

 var request = {
  query: 'potbelly',
  fields: ['name', 'geometry'],
};

function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });

    var li = document.createElement('li');
    li.textContent = place.name;
    placesList.appendChild(li);

    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);
}

var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarkers(results);
      for (var i = 0; i < results.length; i++) {
        // createMarker(results[i]);
        console.log(results[i])
      }
      map.setCenter(results[0].geometry.location);
    }
  });

  
}

// map.data.loadGeoJson('stores.json');

// map.data.setStyle(feature => {
//   return {
//     icon: {
//       url: `img/icon_${feature.getProperty('category')}.png`,
//       scaledSize: new google.maps.Size(64, 64)
//     }
//   };
// });

// here



// map.data.addListener('click', event => {
//   let category = event.feature.getProperty('category');
//   let name = event.feature.getProperty('name');
//   let description = event.feature.getProperty('description');
//   let hours = event.feature.getProperty('hours');
//   let phone = event.feature.getProperty('phone');
//   let position = event.feature.getGeometry().get();
//   let content = `
//     <img style="float:left; width:200px; margin-top:30px" src="img/logo_${category}.png">
//     <div style="margin-left:220px; margin-bottom:20px;">
//       <h2>${name}</h2><p>${description}</p>
//       <p><b>Open:</b> ${hours}<br/><b>Phone:</b> ${phone}</p>
//       <p><img src="https://maps.googleapis.com/maps/api/streetview?size=350x120&location=${position.lat()},${position.lng()}&key=${apiKey}"></p>
//     </div>
//   `;
//   infoWindow.setContent(content);
//   infoWindow.setPosition(position);
//   infoWindow.setOptions({pixelOffset: new google.maps.Size(0, -30)});
//   infoWindow.open(map);
// });