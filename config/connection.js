const fs = require("fs");
//SET UP MYSQL CONNECTION
const mysql = require("mysql");
const dotenv = require("dotenv");
require("dotenv").config(); 

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DTB
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
