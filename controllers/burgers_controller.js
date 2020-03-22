//IMPORT EXPRESS PK
var express = require("express");
//CREATE INSTANCE OF ROUTER TO CREATE ROUTES
var router = express.Router();
//IMPORT MODEL(BURGER.JS)USE DATABASE FUNCTIONS
var burger = require("../models/burger.js");

///////////////////////////////////////////////////////////////
//CREATE ROUTES & SET UP LOGIC
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
//SERVE INDEX.HANDLEBARS TO THE ROOT ROUTE
// ///////////////////////////////////////////////////////////////
router.get("/", function(req, res) {
    //CALLBACK RESPONSE BY CALLING BURGER.SELECTALLBURGER
    burger.all(function(data) {
        
        //HANDLEBARS
        var hbsObject = {
            burgers: data
        };
        console.log("---------RESULTS FOR ALL BURGERS------------");
        console.log(hbsObject);
        
        //DISPLAY
        res.render("index", hbsObject);
    });
});
///////////////////////////////////////////////////////////////
//POST
router.post("/api/burgers", function (req, res) {
    var name = req.body.name;
    var devoured = req.body.devoured;
    //TAKES REQUEST OBJECT AS INPUT
    burger.create([
        
        "name", "devoured"
    ],
    [
        name, devoured
    ],
        function(result) {
        console.log("---------RESULTS FOR CREATE BURGER------------");
        console.log(result);
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
    },condition,function (result) {
            console.log("---------RESULTS FOR UPDATE BURGER------------");
            console.log(results);
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
