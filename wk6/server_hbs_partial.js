//wk6, template, server.js
var express = require("express");
var app = express();
var path = require("path");
var exphbs = require("express-handlebars");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}
// tell server to use handle bars as the template engine
app.engine(".hbs", exphbs({extname:".hbs"}));
app.set("view engine", ".hbs");

app.get("/", function (req, res){
    res.send("Hello world! <br> <a href='/about'> Go to About page </a>");
});
app.get("/about", (req, res)=>{
    res.send("About page");
    //res.sendFile(path.join(__dirname, "./views/about.html"));
});

var someData = {
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank"
};
//pass data
app.get("/getData", (req, res)=>{
    res.json(someData);
});

/* view data in html string
app.get("/viewData", (req, res)=>{
    var htmlStr = " <table border = 1>" +
                "<tr> <td> " + someData.name + "</td>" +
                "<td>" + someData.age + "</td> </tr>" +
                "</table>"
    res.send(htmlStr);
});
*/
// view data using handle bars
app.get("/viewData", (req, res)=>{
    res.render("viewData_partial", {data:someData, layout: false});
    // do not use the default layout main.hbs 
});

app.listen(HTTP_PORT, onHttpStart);
