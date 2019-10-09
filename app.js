var http = require("http");
var app = require("./config/express");



http.createServer(app).listen(8000, function(){
	console.log("Servidor funcionando!")
});