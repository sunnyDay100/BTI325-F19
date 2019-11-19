const bcrypt = require("bcryptjs");
var registerPassword = function ((pswd)=>{
    return new Promise((resolve, reject)=>{
        bcrypt.genSalt(10, function(err,salt){
            bcrypt.hash("12345", salt, function(err, hashValue){
                console.log("store password to db, " + hashValue);
            });
        });
        if (hashValue)
            resolve (hashValue);
        else 
        {
            reject("failed to gen")
        }
    })
})
var checkPassword = function((input)=>{
    return 
})
var hashValue;


bcrypt.compare("12345", hashValue).then((res)=>{
    console.log("password match");
}).catch(()=>{console.log("Password not match")});