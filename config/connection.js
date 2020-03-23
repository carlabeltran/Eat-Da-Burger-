require("dotenv").config();
//SET UP MYSQL CONNECTION
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  //CONNECT TO JAWSDB(HEROKU)
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {

  //connect to localhost
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASS,
    database: "burgers_db"
  });
}
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