//Promise: ex_promise.js
function outputA(){
    var randomTime = Math.floor(Math.random() * 3000)+1;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("A");
            //if (...)
            resolve("Output A resolved.");
            console.log("After resolve.")
        }, randomTime);
    });
}
function outputB(){
    var randomTime = Math.floor(Math.random()*3000)+1;
        setTimeout(function(){
            console.log("B");
        },randomTime);
}

function outputC(){
    var randomTime = Math.floor(Math.random()*3000) +1;
    setTimeout(function(){
        console.log("C");
    },randomTime);
}
outputA().then(function(data){
    
    console.log(data);
    outputB();
    outputC();    
});

/////////////////////
/*
function outputB(){
    var randomTime = Math.floor(Math.random()*3000) + 1;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("B");
            resolve("Output B resolved");
        }, randomTime);
    });
}

function outputC(){
    var randomTime = Math.floor(Math.random()*3000)+1;
    setTimeout(function(){
        console.log("C");
    }, randomTime);
}

outputA().then(function(data1){
    console.log(data1);
    outputB().then(function(data2){
        console.log(data2)
        outputC();
    });
});
*/
//outputB();
//outputC();