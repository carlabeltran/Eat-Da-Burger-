const fs = require("fs");
//SET UP MYSQL CONNECTION
var mysql = require("mysql");

require("dotenv").config(); 


var connection = mysql.createConnection({
    host: process.env.h,
    port: process.env.p1,
    user: process.env.us,
    password: process.env.pw,
    database: process.env.db
});

//MAKE CONNECTION
connection.connect(function(err) {
    if (err) {
    console.error("error connecting: " + err.stack);
    return;
    }
    console.log("connected as id " + connection.threadId);
});

//EXPORT CONNECTION FOR OUR ORM TO USE
module.exports = connection;
