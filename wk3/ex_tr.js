// Error / Exception handling: ex_tr.js
const PI = 3.14;
//console.log("Try to change PI...");
//PI =99;
console.log("Try to change PI!");

try {
    PI = 99;
    console.log("Try to change PI in try block.");
} catch(ex){
    console.log("Error name: " + ex.name);
    console.log("Error message: " + ex.message);
} finally{
    console.log("Do it anyway.");
    console.log(PI);
}
