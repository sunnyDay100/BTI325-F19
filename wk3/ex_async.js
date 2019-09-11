//Asynchronous: ex_async.js
function outputA(){
    var randomTime = Math.floor(Math.random()*3000) + 1;
    
    setTimeout(function(){
        console.log("A");
    }, randomTime);
}

function outputB(){
    var randomTime = Math.floor(Math.random()*3000)+1;
    setTimeout(function(){
        console.log("B");
    }, randomTime);
}

function outputC(){
    var randomTime = Math.floor(Math.random()*3000)+1;
    setTimeout(function(){
        console.log("C");
    }, randomTime);
}

outputA();
outputB();
outputC();