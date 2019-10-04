module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    qty: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Example.associate = function(models){
    //associations can be defined here
  };
  return Example;
};


//TODO: run the database on the workbrnch again to reflect the new changes
