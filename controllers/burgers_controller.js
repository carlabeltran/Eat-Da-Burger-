//IMPORT EXPRESS PK
const express = require("express");
//CREATE INSTANCE OF ROUTER
const router = express.Router();
//IMPORT THE MODEL (BURGER.JS)TO USE ITS DATABASE FUNCTIONS
const burger = require("../models/burger.js");

///////////////////////////////////////////////////////////////
//CREATE & SET UP ROUTES
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
//SERVE INDEX.HANDLEBARS TO THE ROOT ROUTE
///////////////////////////////////////////////////////////////
router.get("/", function (req, res) {
    //ALL BURGERS
    burger.all(function (errAllBurgers, data) {
        
        if (errAllBurgers) {
            return res.status(500).end();
        }; 
        //HANDLEBARS
        const hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        
        //DISPLAY
        res.render("index", hbsObject);
    });
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//POST
router.post("/api/burgers", function(req, res) {
    burger.create(["name", "isdevoured"], [req.body.name, req.body.isdevoured], function(errAddBurger,result) {
        if(errAddBurger) {
            //IF ERROR SEND GENERIC SERVER FAILER
            return res.status(500).end();
        }
        //SEND BACK ID OF NEW BURGER
        res.json({ id: result.insertId });
    });
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//UPDATE A QUOTE BY ID THEN REDIRECT ROOT ROUTE
router.put("/api/burgers/:id", function(req, res) {
    const condition = "id = " + req.params.id;
    console.log("condition", condition);
    //BURGER UPDATE
    burger.update(
        {
            isdevoured: req.body.isdevoured
        },
        condition,
        function(errUpdateBurger, result) {
            if (errUpdateBurger) {
                //IF ERROR SEND GENERIC SERVER FAILER
                return res.status(500).end();
            } else if (result.changedRows == 0) {
                //IF NO ROWS CHANGED,THEN ID DOESN'T EXIST = 404
                return res.status(404).end();
            } else {
                res.status(200).end();
            }
        }
    );
});
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//DELETE
router.delete("/api/burgers/:id", function(req, res) {
    const condition = "id = " + req.params.id;
    //BURGER DELETE
    burger.delete(condition, function(errDeleteBurger,result) {
        if (errDeleteBurger) {
            //IF ERROR SEND GENERIC SERVER FAILER
            return res.status(500).end();
        } else if (result.affectedRows == 0) {
            //IF NO ROWS CHANGED,THEN ID DOESN'T EXIST = 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//EXPORT ROUTES FOR SERVER.JS TO USE
module.exports = router;
