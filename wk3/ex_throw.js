//Throwing Errors: ex_throw.js
function divide (x,y){
    if (y == 0) {
        //throw new Error("Division by Zero");
         throw {name:"definedError", message: "Division by Zero!!!!!"};
    }
    return x/y;
}

let a = 3, b = 0, c;
try {
    c = divide(a,b);
} catch(ex){
    console.log("Error Name: " + ex.name);
    console.log("Error message: " + ex.message);
    c = NaN;
}
console.log( a + " /" + b + " = " + c);