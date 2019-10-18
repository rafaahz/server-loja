var express = require("express");
var cors = require("cors");
var load = require("express-load");
var bodyParser = require("body-parser");
var app = express();

require('dotenv').config()


app.use(express.static('./public'));

app.use( cors() );

app.set("view engine", "ejs");
app.set('views', './views');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

load("infra").then("api").then("routes").into(app);
//.then("routes/auth.js")

module.exports = app;

