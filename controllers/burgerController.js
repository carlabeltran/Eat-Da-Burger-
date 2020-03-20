//IMPORT EXPRESS PK
const express = require("express");

//CREATE INSTANCE OF ROUTER
const router = express.Router();

//IMPORT THE MODEL (BURGER.JS)TO USE ITS DATABASE FUNCTIONS
const burger = require("../models/burger.js");

///////////////////////////////////////////////////////////////
//CREATE & SET UP ROUTES
///////////////////////////////////////////////////////////////
//GET
router.get("/", function (req, res) {
    //ALL BURGERS
    burger.all(function (data) {
        //HANDLEBARS
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        //DISPLAY
        res.render("index", hbsObject);
    });
});

//POST
router.post("/api/burgers", function (req, res) {
    burger.addBurger(["name", "isdevoured"], [req.body.name, req.body.isdevoured], function (
        result) {
        //SEND BACK ID OF NEW BURGER
        res.json({ id: result.insertId });
    });
});

//PUT
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    //BURGER UPDATE
    burger.updateBurger(
        {
            isdevoured: req.body.isdevoured
        },
        condition,
        function (result) {
            if (result.changedRows == 0) {
                //IF NO ROWS CHANGED,THEN ID DOESN'T EXIST = 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});

//DELETE
router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    //BURGER DELETE
    burger.delete(condition, function (result) {
        if (result.affectedRows == 0) {
            //IF NO ROWS CHANGED,THEN ID DOESN'T EXIST = 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//EXPORT ROUTES FOR SERVER.JS TO USE
module.exports = router;
