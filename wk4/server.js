//wk4- server.js
var express = require("express");
var app = new express();

var HTTP_PORT = process.env.PORT || 8080;

var on_http = function(){
    console.log("Server is listening on port: " + HTTP_PORT);
}
//localhost:8080/dog.png
app.use(express.static("./public/images"));

//localhost:8080/images/dog.png
//app.use(express.static("./public"));

/*  http://localhost:8080 */
app.get("/", (req, res)=>{
    res.send("Hello World!");
});

/* http://localhost:8080/headers   */
app.get("/headers", (req, res)=>{
    const headers = req.headers;
    res.send(headers);
});

app.use((req, res)=>{
    res.status(404).send("Page not found.");
});

app.listen(HTTP_PORT, on_http);

// https://www.google.com/search?client=safari&source=hp&ei=Dh-BXcy1A6KJggfKrIeABA&q=programming+languages&oq=programming+langage&gs_l=psy-ab.3.0.0i10l10.2683.5269..8636...0.0..0.196.1483.17j2......0....1..gws-wiz.......0i131j0j0i22i10i30.4Bwd_q8IxVE