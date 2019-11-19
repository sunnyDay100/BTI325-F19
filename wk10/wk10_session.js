const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const clientSessions = require("client-sessions");

const HTTP_PORT = process.env.PORT || 8080;

// create middleware function to setup client-sessions
/* register clientSessions as a middleware and configure it
register handlebars as a view rendering engine
bodyParser to handle application/x-www-form-urlencoded POST data, form without file upload
*/

//Register handlebars as the rendering engine for views
app.engine(".hbs", exphbs({
    extname: ".hbs"
}));
app.set("view engine", ".hbs");


//setup the static folder that static resources can load from, such as images, css files
app.use(express.static("static"));

//setup client-sessions
app.use(clientSessions({
    cookieName:"userSession", // this is the object name that will be added to "req"
    secret: "Week10SessionExample_BTI325", //this should be a long-unguessable string.
    duration: 2 * 60 * 1000, //duration of the session in milliseconds (2 mins)
    activeDuration: 1000 * 60 //the session will be extended by this many milliseconds each request (1 min)
}));

//Parse application/x-www-form-urlencoded, form without file upload
app.use(bodyParser.urlencoded({extended: true}));

//call this function after the http server starts listening for requests
function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

//hardcoded a user:
const user = {
    username: "bti325",
    password: "Success",
    email: "all@bti325.ca"
};

//setup a route on the "root" of the url to redirect to /login
app.get("/", (req, res)=>{
    res.redirect("/login");
});

//display the login html page
app.get("/login", (req, res)=>{
    res.render("login", {});
});

//the login route that adds the user to the session
app.post("/login", (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if (username.trim().length == 0 || password.trim().length == 0)
    {
        //render "missing credentials"
        return res.render("login", {errorMsg: "Missing Credentials"});
        //res.render("login", {errorMsg: "Missing Credentials"});
    } 

    //user sample user (declared above)
    if (username === user.username && password === user.password)
    {
        //add the user on the session and redirect them to the dashboard page
        req.userSession.user = {
            username: user.username,
            email: user.email
        };
        //req.userSession.user = user;  
        res.redirect("/dashboard");
    } else {
        //render "invalid username or password"
        res.render("login", {errorMsg: "Invalid username or password."});
    }
}); // end of app.post("/login",...)

/* An authenticated route that requires the user to be logged in
    Notice the middleware 'ensureLogin' that comes before the function thtat renders the dashboard page
*/
app.get("/dashboard", ensureLogin, (req, res)=>{
    res.render("dashboard", {user: req.userSession.user});
});

/* this is a helper middleware function that checks if a user is logged in
    we can use it in any route that we want to protect against unauthenticated access.
    A more advanced version of this would include checks for authorization as well after
    checking if the user is authenticated.
*/
function ensureLogin(req, res, next)
{
    if (!req.userSession.user) {
        res.redirect("/login");
    } else { next();}
}
//log a user out by destroying their session and redirect them to "/login"
app.get("/logout", (req, res)=>{
    req.userSession.reset();
    res.redirect("/login");
});

app.listen(HTTP_PORT, onHttpStart);


