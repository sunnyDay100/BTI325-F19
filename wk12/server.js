/* wk12 - session with SSL/TLS -self-signed certificate */
// step1: Add the client-sessions library
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");

/** openssl req -new -x509 -nodes -out server.crt -keyout server.key
 *  adding the https port for 4433 and
 *  reading in the certificates as well as updating the assets folder
 */
const fs = require("fs");
const http=require("http");
const https=require("https");

const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 4433;

const WEEK12ASSETS = "./week12-assets/";
const SSL_KEY_FILE = WEEK12ASSETS + "server.key";
const SSL_CRT_FILE = WEEK12ASSETS + "server.crt";

// read in the contents of the HTTPS certificate and key
const https_options = {
    key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
    cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};


// step2: Register handlebars as rendering engine for views
app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");

//setup the static folder that static resources can load from, e.g., images, css
app.use(express.static("static"));

//setup client-sessions
app.use(clientSessions({
    cookieName: "session", // object name that will be added to "req"
    secret: "BTI325_week10example_veryLongLongLong",//this should be a long un-guessable string.
    duration: 2 * 60 * 1000, //duration of the session in milliseconds (2 mins)
    activeDuration: 1000* 60 //the session will be extended by 1 min each request
}));

//Parse application/x-www-form-urlencoded, (no file upload)
app.use(bodyParser.urlencoded({extended:true}));

//step3: write a login route handler with username and password
// call this function after the http server starts listening for requests
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}
function onHttpsStart(){
    console.log("Express https server listening on: " + HTTPS_PORT);
}
//A simple user object, hardcoded for this example
const user={
    username: "abc",
    password: "12345",
    email: "abc@abc.com"
};

//setup a route on the 'root' of the url to redirect to /login
app.get("/", (req, res)=>{
    res.redirect("/login");
});

//Display the login html page
app.get('/login', (req,res)=>{
    res.render("login",{});
});

// the login route that adds the user to the session
app.post("/login", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    //if(username==="" || password === "")
    if (username.trim().length===0 || password.trim().length===0)
        {
            // Render 'missing credentials'
            // use return render when using conditions
           return res.render("login", {errorMsg: "Missing credentials."});
          // res.render("login", {errorMsg: "Missing credentials."});
          // console.log("Return...");
        }
        //use sample 'user' (declared above) 
        //if (username === user.username && password === user.password)
        //else 
        if (username.trim().toUpperCase() ===user.username.trim().toUpperCase() && password === user.password)
        {
            //Add the user on the sesssion and redirect them to the dashboard page
            req.session.user = {
                username: user.username,
                email: user.email
            };
            res.redirect("/dashboard");
        } else{
            //render 'invalid username or password'
            res.render("login",{errorMsg: 'invalid username or password'});
        }
});// app.post("/login",(req,res)=>{...})

// log a user out by destroying their session
// and redirect them to route /login
app.get("/logout", (req,res)=>{
    req.session.reset();
    res.redirect("/login");
});

// step 4: add a middleware function to check for authorization
/* an authenticated route that requires the user to be logged in.
    Note that: the middleware 'ensureLogin' comes before the function
               that renders the dashboard page 
*/
app.get("/dashboard", ensureLogin, (req,res)=>{
    res.render("dashboard",{user: req.session.user});
});

/* this is a helper middleware function that checks if a user is logged in
    we can use it in any route that we want to protect against unauthenticated access.
    A more advanced version of this would include checks for authorization as well after
    checking if the user is authenticated
*/
function ensureLogin(req, res, next){
    if (!req.session.user){
        res.redirect("/login");
    } else{
        next();
    }
}

/** listen on ports HTTP_PORT and HTTPS_PORT.
 * The default port for http is 80, https is 4433.
 * we use 8080 and 4433 here because sometimes port 80 is in use by other applications
 * on the machine and using port 443 requires admin access on osx 
 */
//app.listen(HTTP_PORT, onHttpStart);
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(https_options, app).listen(HTTPS_PORT, onHttpsStart);

//https://localhost:4433/