//server_file.js // form with <input type = "file" ...>

const express = require ("express");
const multer = require ("multer");
const path = require ("path");

const app = express();

const HTTP_PORT = process.env.PORT || 8080;

function onHttpStart(){
    console.log("Express http server listening on: " +HTTP_PORT);
}

/* multer requires a few options to be setup to store files with file extensions
    by default it won't store extensions for security reasons
*/
const storage = multer.diskStorage({
    destination: "./public/photos",
    filename: function(req, file, cb){
        /* we write the filename as the current date down to the millisecond
            in a large web service this would possibly cause a problem 
            if two people uploaded an image at the exact same time.
            A better way would be to use GUID's for file names
        */
       cb(null, Date.now()+ path.extname(file.originalname));
    }
});

//tell multer to use the diskstorage function for naming files instead of the default
const upload = multer({storage: storage});

// (server) Create a route in express to handle the form data on the req object
/* set up the static folder that static resources can load from
    we need this so that the photo can be loaded from the server 
    by the browser after sending it
*/
app.use(express.static("./public/"));

/* setup a route on the "root" of the url that has the form
    i.e., http://localhost/
*/
app.get("/", (req, res)=>{
    //send the html view with the form to the client
    res.sendFile(path.join(__dirname, "./views/registerUser_file.html"));
});

/* Now add a route that we can POST the form data to
    i.e., http://localhost/register-user
    add the middleware function (upload.single("photo")) for multer to 
    process the file upload in the form
    the string you pass the single() function is the value of the "name" attribute 
    on the form for the file input element
*/
app.post("/register-user", upload.single("photo"), (req,res)=>{
   // res.send("register");
   const formData = req.body;
   const formFile = req.file;
   const dataReceived = " Form data: " + JSON.stringify(req.body) + "<br>" +
                        "File: " + JSON.stringify(formFile) + "<br>" +
                        "<p style='color:red;'> Your user name is: " + formData.userName + "</p> <br>"+
                        "<img src = '/photos/"+ formFile.filename +"' width=300 height =200/>";
    res.send(dataReceived);
});

app.listen(HTTP_PORT, onHttpStart);