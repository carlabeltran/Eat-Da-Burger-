//////////////////////////////////////////
//ORM.JS - FUNCTIONS THAT TAKE INPUTS & CONDITIONS & TURNS THEM INTO DATABASE COMMANDS LIKE SQL
//////////////////////////////////////////

//////////////////////////////////////////
//IMPORT MYSQL CONNECTION
//////////////////////////////////////////
var connection = require("../config/connection.js");
//////////////////////////////////////////

//////////////////////////////////////////
//HELPER FUNCTION FOR SQL SYNTAX
//////////////////////////////////////////
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    };

    return arr.toString();
};
//////////////////////////////////////////

//////////////////////////////////////////
//HELPER FUNCTION TO CONVERT OBJECT KEY/VALUE PAIRS TO SQL SYNTAX
//////////////////////////////////////////
function objToSql(ob) {
    var arr = [];
    //LOOP THROUGH KEYS & PUSH KEY/VALUES AS STRING IN ARR
    for (var key in ob) {
        var value = ob[key];
        //CHECK TO SKIP HIDDEN PROPERTIES
        if (Object.hasOwnProperty.call(ob, key)) {
            //IF STRING WITH SPACES, ADD QUOTATIONS
            //EX: (BURGER NAME => "BURGER NAME")
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            //EX: {name: 'BURGER NAME'} => ["name='BURGER NAME'"]
            //EX: {ISDEVOUERD: true} => ["ISDEVOUERD=true"]
            arr.push(key + "=" + value);
        };
    };
    //TRANSLATE ARRAY OF STRINGS TO A SINGLE COMMA-SEPARTATED STRING
    return arr.toString();
};
//////////////////////////////////////////

//OBJECT FOR ALL OUR SQL STATEMENT FUNCTIONS
var orm = {
    //SELECT ALL
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(errAllConnectionOrm, result) {
            if (errAllConnectionOrm) {
                throw errAllConnectionOrm;
            }
            cb(result);
        });
    },
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

        connection.query(queryString, vals, function(errCreateConnectionOrm, result) {
            if (errCreateConnectionOrm) {
                throw errCreateConnectionOrm;
            }
            cb(result);
        });
    },
    //OBJCOLVALS=COLUMNS & VALUES TO UPDATE
    //EX:{NAME:BURGER NAME, DEVOURED: TRUE}
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(errUpdateConnectionOrm, result) {
            if (errUpdateConnectionOrm) {
                throw errUpdateConnectionOrm;
            }
            cb(result);
        });
    }
};

//EXPORT THE ORM OBJECT FOR THE MODEL(BURGER.JS) 
module.exports = orm;