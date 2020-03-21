/////////////////////////////////////////////////////////////
//INITIALIZE
/////////////////////////////////////////////////////////////
var express = require("express");

//SET THE PORT OF APP 
//process.env.PORT LETS HEROKU SET PORT
var PORT = process.env.PORT || 8080;

var app = express();

//SERVE STATIC CONTENT FOR APP FROM "PUBLIC"
app.use(express.static(__dirname + "/public"));

//EXPRESS APP TO HANDLE DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SET HANDLEBARS
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//SET UP & IMPORT ROUTES & GIVE SERVER ACCESS
var routes = require("./controllers/burgers_controller.js");

app.use(routes);
app.use("/", routes);
app.use("/update", routes);
app.use("/create", routes);
/////////////////////////////////////////////////////////////
//LISTEN FOR CLIENT REQUESTS
/////////////////////////////////////////////////////////////
app.listen(PORT, function () {
    //LOG(SERVER-SIDE)WHEN SERVER IS STARTED
    console.log("Server listening on: http://localhost:" + PORT);
});
