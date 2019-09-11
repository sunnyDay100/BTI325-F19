//Promise reject: ex_promise_reject.js
function outputA(){
    var randomTime = Math.floor(Math.random()*3000) +1;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("-");
            //resolve("outputA resolved."); // go to "then"
            reject("outputA rejected!"); // go to "catch"
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
}).catch(function(reason){
    console.log(reason);
});
