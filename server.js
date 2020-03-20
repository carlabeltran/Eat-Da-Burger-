/////////////////////////////////////////////////////////////
//INITIALIZE
/////////////////////////////////////////////////////////////
const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

//SET THE PORT OF APP 
//process.env.PORT LETS HEROKU SET PORT
const PORT = process.env.DB_PORT || 8080;

//SERVE STATIC CONTENT FOR APP FROM "PUBLIC"
app.use(express.static("public"));

//EXPRESS APP TO HANDLE DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SET HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//SET UP & IMPORT ROUTES & GIVE SERVER ACCESS
const routes = require("./controllers/burgers_controller.js");

app.use(routes);

/////////////////////////////////////////////////////////////
//LISTEN FOR CLIENT REQUESTS
/////////////////////////////////////////////////////////////
app.listen(PORT, () =>
    //LOG(SERVER-SIDE)WHEN SERVER IS STARTED
    console.log("Server listening on: http://localhost:" + PORT));
