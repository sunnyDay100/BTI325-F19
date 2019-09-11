//Promise Chain: ex_promise_chain.js
function outputA(){
    var randomTime = Math.floor(Math.random()*3000) +1;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("A");
            resolve("outputA resolved."); // go to "then"
            //reject("outputA rejected!"); // go to "catch"
        }, randomTime);
    });
}

function outputB(){
    var randomTime = Math.floor(Math.random()*3000) +1;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("B");
            resolve("outputB resolved."); // go to "then"
            //reject("outputA rejected!"); // go to "catch"
        }, randomTime);
    });
}

function outputC(){
    var randomTime = Math.floor(Math.random()*3000) +1;
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            console.log("C");
            resolve("outputB resolved."); // go to "then"
            //reject("outputA rejected!"); // go to "catch"
        }, randomTime);
    });
}

outputA().then(outputB).then(outputC)
.catch(function(rejectMsg){
    console.log(rejectMsg);
});