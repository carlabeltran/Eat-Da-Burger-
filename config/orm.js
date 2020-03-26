//ORM.JS - FUNCTIONS THAT TAKE INPUTS & CONDITIONS & TURNS THEM INTO DATABASE COMMANDS LIKE SQL
//////////////////////////////////////////
//IMPORT MYSQL CONNECTION
var connection = require("../config/connection.js");

//HELPER FUNCTION FOR SQL SYNTAX
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};

//HELPER FUNCTION TO CONVERT OBJECT KEY/VALUE PAIRS TO SQL SYNTAX
function objToSql(ob) {
    var arr = [];
    //LOOP THROUGH KEYS & PUSH KEY/VALUES  PAIR AS STRING INTO ARRAY
    for (var key in ob) {
        var value = ob[key];
        //CHECK SPECIFIED PROPERTY AS ITS OWN PROPERTY
        if (Object.hasOwnProperty.call(ob, key)) {
            //IF STRING WITH SPACES, ADD QUOTATIONS
            //EX: (BURGER NAME => "BURGER NAME")
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            //EX: {name: 'BURGER NAME'} => ["name='BURGER NAME'"]
            //EX: {DEVOUERD: false} => ["DEVOUERD=false"]
            arr.push(key + "=" + value);
        };
    };
    //TRANSLATE ARRAY OF STRINGS TO A SINGLE COMMA-SEPARTATED STRING
    return arr.toString();
};

//METHODS NEEDED IN ORDER TO RETRIEVE & STORE DATA IN DB
//OBJECT FOR ALL OUR SQL STATEMENT FUNCTIONS
var orm = {
    //FUNCTION RETURNS ALL ENTRIES
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //FUNCTION TO CREATE & INSERT TABLE ENTRY
    //VALS=ARRAY OF VALUES-SAVE TO COLS
    //COLS=COLUMNS TO INSERT VALUES
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //FUNCTION TO UPDATE TABLE ENTRY
    //OBJCOLVALS=COLUMNS & VALUES TO UPDATE
    //EX:{NAME:BURGER NAME, DEVOURED: TRUE}
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //FUNCTION TO DELETE TABLE ENTRY
    delete: function (table, condition, cb) {
        var queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

//EXPORT THE ORM OBJECT FOR THE MODEL(BURGER.JS) 
module.exports = orm;