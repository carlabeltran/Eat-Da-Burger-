//IMPORT ORM TO CREATE FUNCTIONS THAT WILL INTERACT W/ DATABASE
var orm = require("../config/orm.js");


//CALLING BURGER
var burger = {
  //ALL CALLBACK FUNCTION
  all: function (cb) {
    orm.all("burgers", function (res) {
      cb(res);
    });
  },
  //ARRAY VARIABLE COLS & VALS.
  create: function (name, cb) {
    
    orm.create("burgers", [
      "name", "devoured"
    ], [
      name, false
    ], cb);
  },
  update: function (id, cb) {
    var condition = "id=" + id;
    orm.update("burgers",
      {
        devoured: true
      }, condition, cb);
  }
};

//EXPORT DB FUNCTIONS FOR THE CONTROLLER BURGER(burgers_controller.js)
module.exports = burger;
