//server_file.js // form with <input type = "file" ...>

const express = require ("express");
//const multer = require ("multer");
const bodyParser = require("body-parser");
const path = require ("path");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: " +HTTP_PORT);
}

//app.use(express.static("./public/"));

app.use(bodyParser.urlencoded({extended:true}));
/* setup a route on the "root" of the url that has the form
    i.e., http://localhost/
*/
app.get("/", (req, res)=>{
    //send the html view with the form to the client
   // res.sendFile(path.join(__dirname, "./views/registerUser_file.html"));
    res.sendFile(path.join(__dirname, "./views/registerUser_text.html"));
});

/* Now add a route that we can POST the form data to
    i.e., http://localhost/register-user
    add the middleware function (upload.single("photo")) for multer to 
    process the file upload in the form
    the string you pass the single() function is the value of the "name" attribute 
    on the form for the file input element
*/
//app.post("/register-user", upload.single("photo"), (req,res)=>{
    app.post("/register-user", (req,res)=>{
// res.send("register");
   const formData = req.body;
//   const formFile = req.file;
   const dataReceived = " Form data: " + JSON.stringify(formData) + "<br>" +
                        "<p style='color:red;'> Your name is: " + formData.name + "</p> <br>";
    res.send(dataReceived);
});

app.listen(HTTP_PORT, onHttpStart);