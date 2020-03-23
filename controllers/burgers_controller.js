//IMPORT EXPRESS ROUTES
var express = require("express");
//CREATE INSTANCE OF ROUTER TO CONTROL ROUTES
var router = express.Router();
//IMPORT MODEL(BURGER.JS)USE DATABASE FUNCTIONS
var burger = require("../models/burger.js");
///////////////////////////////////////////////////////////////
//CREATE ROUTES & SET UP LOGIC
//JS OBJECT/DATA PASSED TO VIEW ENGINE(HANDLEBARS)
//HANDLEBARS RENDER HTML FILE & BURGERS OBJECT
///////////////////////////////////////////////////////////////
//GET ROUTE DISPLAY ALL BURGERS
router.get("/", function (req, res) {
  //CALLBACK RESPONSE CALLING SELECT ALL BURGERS
  burger.all(function (data) {
    //HANDLEBARS
    var hbsObject = {
      burgers: data
    };
    console.log("---------RESULTS FOR ALL BURGERS------------");
    console.log(hbsObject);
    //DISPLAY DATA IN INDEX HANDLEBAR
    res.render("index", hbsObject);
  });
});
///////////////////////////////////////////////////////////////
//POST ROUTE TO CREATE BURGERS
router.post("/burgers", function (req, res) {
  burger.create([
    "name"
  ], [
    req.body.name
  ], function(result) {
    console.log("---------RESULTS FOR CREATE BURGER------------");
    console.log(result);
    //SEND BACK ID OF NEW BURGER
    res.json("index", { id: result.insertId });
    res.redirect("/");
  }
  );
});
///////////////////////////////////////////////////////////////
//PUT ROUTE TO UPDATE BURGERS
router.put("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  burger.update(
    {
      devoured: true
    },
    condition, function(data) {
      res.redirect("/");
    });
});
router.delete("/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.delete(condition, function (result) {
    if (result.changedRows === 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
    res.redirect("/");
  });
});




//EXPORT ROUTES FOR SERVER.JS TO USE
module.exports = router;
