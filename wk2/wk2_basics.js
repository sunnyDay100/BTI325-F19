// wk2.js - examples for week2 contents
/*
console.log("Hello World");
console.log(__dirname);
console.log(__filename);
setTimeout(function(){
    console.log("Hello after 1 second");
}, 5000);

//**** setInterval() 
var count =1; 
var maxCount = 5;

var myCountInterval = setInterval(function(){
    console.log("Hello after " + (count++) + " second(s)");
    checkMaximum();
}, 1000);

// function checkMaximum(){...}
var checkMaximum = function(){
    if (count > maxCount)
        {
            clearInterval(myCountInterval);
        }
}
*/
// user input

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter Name: ", function(answer){
    console.log("Hello " + answer);
    rl.close();
}); 


// modules
// main file
/*
var message = require("./modules/message.js");
// functions from ./modules/message.js
message.writeMessage("Hello World"); 
message.readMessage();
//message.localFunction();
*/