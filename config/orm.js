//IMPORT MYSQL CONNECTION
var connection = require("../config/connection.js");

//////////////////////////////////////////
//////////////////////////////////////////

//HELPER FUNCTION FOR SQL SYNTAX
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
function objToSql(ob) {
    var arr = [];

    //LOOP THROUGH THE KEYS & PUSH THE KEY/ VALUES AS A STRING INT ARR
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
//////////////////////////////////////////

//OBJECT FOR ALL OUR SQL STATEMENT FUNCTIONS
const orm = {
    //SS
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
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
    //EX: {NAME:BURGER NAME, DEVOURED: TRUE}
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
    //DELETE
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

//EXPORT THE ORM OBJECT FOR THE MODEL (BURGER.JS) 
module.exports = orm;