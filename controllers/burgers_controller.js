//IMPORT EXPRESS PK
var express = require("express");
//CREATE INSTANCE OF ROUTER
var router = express.Router();
//IMPORT MODEL(BURGER.JS)USE DATABASE FUNCTIONS
var burger = require("../models/burger.js");

///////////////////////////////////////////////////////////////
//CREATE ROUTES & SET UP LOGIC
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
//SERVE INDEX.HANDLEBARS TO THE ROOT ROUTE
///////////////////////////////////////////////////////////////
router.get("/", function (req, res) {
    res.redirect("/api/burgers");
});

router.get("/api/burgers", function(req, res) {
    //CALLBACK RESPONSE BY CALLING BURGER.SELECTALLBURGER
    burger.all(function(data) {
        
        //HANDLEBARS
        var hbsObject = {
            burgers: data

        };
        console.log("---------------------------------------")
        console.log(hbsObject);
        
        //DISPLAY
        res.render("index", hbsObject);
    });
});
///////////////////////////////////////////////////////////////

//POST
router.post("/api/burgers/:id", function (req, res) {
    //TAKES REQUEST OBJECT AS INPUT
    burger.create(["name", "devoured"], [req.body.name, req.body.devoured], function(result) {
        console.log(result)
        //SEND BACK ID OF NEW BURGER
        res.json({ id: result.insertId });
    });
});
///////////////////////////////////////////////////////////////

//UPDATE A QUOTE BY ID THEN REDIRECT ROOT ROUTE
router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
    //BURGER UPDATE
    burger.update({
            devoured: req.body.devoured
    },condition,
    function(result) {
        if (result.changedRows == 0) {
            //IF NO ROWS CHANGED,THEN ID DOESN'T EXIST = 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//EXPORT ROUTES FOR SERVER.JS TO USE
module.exports = router;
