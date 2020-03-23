//USES ORM WITHIN CONFIG FOLDER TO GET DATA FROM DATABASE & SENDS IT TO CONTROLLER
//CONTAINS ALL METHODS USED TO MODIFY ORM FOR BURGERS DB
//IMPORT ORM TO CREATE FUNCTIONS THAT WILL INTERACT W/ DATABASE
var orm = require("../config/orm.js");

//CALLING BURGER
var burger = {
  //ALL CALLBACK FUNCTION
  all: function(cb) {
    orm.all("burgers", function(res) {
      cb(res);
    });
  },
  //ARRAY VARIABLE COLS & VALS.
  create: function(cols, vals, cb) {
    orm.create("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};

//EXPORT DB FUNCTIONS FOR THE CONTROLLER BURGER(burgers_controller.js)
module.exports = burger;
