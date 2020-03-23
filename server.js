/////////////////////////////////////////////////////////////
//INITIALIZE
/////////////////////////////////////////////////////////////
//CREATE EXPRESS CONNECTION & RUN NODE SERVER
var express = require("express");
//SET HANDLEBARS
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

//SET THE PORT OF APP
//process.env.PORT LETS HEROKU SET PORT
var PORT = process.env.PORT || 8080;

var app = express();

//SERVE STATIC CONTENT FOR APP FROM "PUBLIC"
app.use(express.static("public"));

//EXPRESS APP TO HANDLE DATA PARSING
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//MAIN PAGE IS ALWAYS DISPLAYED
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//SET UP & IMPORT ROUTES & GIVE SERVER ACCESS
var routes = require("./controllers/burgers_controller.js");

//EXPRESS DEFINED ROUTES
app.use("/", routes);

/////////////////////////////////////////////////////////////
//LISTEN FOR CLIENT REQUESTS
/////////////////////////////////////////////////////////////
app.listen(PORT, function() {
    //LOG(SERVER-SIDE)WHEN SERVER IS STARTED
    console.log("Server listening on: http://localhost:" + PORT);
});
