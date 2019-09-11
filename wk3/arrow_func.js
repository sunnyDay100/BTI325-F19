//Arrow Function: arrow_func.js
/* (para1, para2,...) => { logic } */
var outputMessage = function(message1, message2) {
    console.log(message1);
    console.log(message2);
}

var out2 = (msg1, msg2)=>{
    console.log(msg1);
    console.log(msg2);
}

outputMessage("Function", "Expression");
out2("Arrow", "Function");