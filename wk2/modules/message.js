// functions in ./modules/message.js

var localFunction = function(){
    console.log("Print from local function");
}
//localFunction();

var localMessage = "";

module.exports.writeMessage = function(msg){
    localMessage = msg;
}

module.exports.readMessage = function(){
    console.log(localMessage + " from " + __filename);
}