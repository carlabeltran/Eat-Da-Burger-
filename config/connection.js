//SET UP MYSQL CONNECTION
var mysql = require("mysql");

require("dotenv").config(); 

//CREATE CONNECTION
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.PASS,
  database: "burgers_db"
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