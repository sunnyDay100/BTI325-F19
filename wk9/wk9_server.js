const express= require("express");
const path = require ("path");
const bodyParser = require("body-parser");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

//make sure the application can access JSON formatted data from the body of the request
app.use(bodyParser.json());

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/api/users", (req, res)=>{
    res.json({message: "Fetch all users"});
});

app.post("/api/users", (req, res)=>{
    res.json({message:"Add new user: " + req.body.fName + " " + req.body.lName});
});

app.get("/api/users/:userId", (req, res)=>{
    res.json({message: "Get user with Id: " + req.params.userId});
});

app.put("/api/users/:userId", (req, res)=>{
    res.json({message: "Update user with Id: " + req.params.userId + 
                    " to " + req.body.fName + " " + req.body.lName});
});

app.delete("/api/users/:userId", (req, res)=>{
    res.json({message: "Delete user with Id: " + req.params.userId});
});

app.listen(HTTP_PORT, ()=>{ 
    console.log("Express HTTP server listening on: " + HTTP_PORT);
});