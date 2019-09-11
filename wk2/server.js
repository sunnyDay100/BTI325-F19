// server.js
var express = require("express");
var path = require("path");

var app = express();
var HTTP_PORT = process.env.PORT || 8080;

// call this function after the http server starts listening for requests
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

//setup a "route" to listen on the default url path (http://localhost)
app.get("/", function(req, res){
    res.send("Hello Everyone <br>  <a href='/about'> Go to About page </a>");
});

//setup another route to listen on /about
app.get("/about", function(req, res){
   // res.send("<h3> About Us </h3>");
   res.sendFile(path.join(__dirname,"/views/about.html"));
});

//setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);

/*    http://localhost:8080/    
      http://localhost:8080/about
      http://localhost:8080/contact
*/