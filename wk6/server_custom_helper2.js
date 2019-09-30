//wk6, template, server.js
var express = require("express");
var app = express();
var path = require("path");
var exphbs = require("express-handlebars");

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}
// tell server to use handlebars as the template engine
app.engine(".hbs", exphbs({
    extname:".hbs",
    helpers:{
        strong: function(options){
            return "<strong>" + options.fn(this)+"</strong>";
        },
        list: function(context, options){
            var ret="<ul>";
            for (let i=0; i<context.length; i++)
            {
                ret += "<li>" + options.fn(context[i]) + "</li>";
            }
            return ret + "</ul>";
        }
    }}));
app.set("view engine", ".hbs");

app.get("/", function (req, res){
    res.send("Hello world! <br> <a href='/about'> Go to About page </a>");
});
app.get("/about", (req, res)=>{
    res.send("About page");
    //res.sendFile(path.join(__dirname, "./views/about.html"));
});

var someData = [{
    name: "John",
    age: 23,
    occupation: "developer",
    company: "Scotiabank",
    },
    {name: "Sarah",
     age:26,
     occupation: "manager",
     company: "TD" }
];
//pass data
app.get("/getData", (req, res)=>{
    res.json(someData);
});

// view data using handle bars
app.get("/viewData", (req, res)=>{
    res.render("viewData_custom_helper2", {data:someData, layout: false});
    // do not use the default layout main.hbs 
});

app.listen(HTTP_PORT, onHttpStart);
