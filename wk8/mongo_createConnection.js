//wk8
// Mongo connection
//mongodb+srv://Sunny:<password>@senecaweb-ypfi5.mongodb.net/test?retryWrites=true&w=majority

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// this step is needed if there are special characters in your password, ie "$"
//let pass1 = encodeURIComponent("pa$$word1"); 
//let db1 = mongoose.createConnection(`mongodb://dbUser:${pass1}@senecaweb-shard-00-00-abcde.mongodb.net:27017,senecaweb-shard-00-01-abcde.mongodb.net:27017,senecaweb-shard-00-02-abcde.mongodb.net:27017/db1?ssl=true&replicaSet=SenecaWeb-shard-0&authSource=admin&retryWrites=true`);

// verify the db1 connection

//connect to localhost mongo running on default port 27017
var uri = "mongodb://localhost/myDB";
//var uri = "mongodb+srv://Sunny:<password>@senecaweb-ypfi5.mongodb.net/bti325_wk8?retryWrites=true&w=majority";

//mongoose.connect("mongodb://localhost/myDB", { useNewUrlParser: true, useUnifiedTopology: true });
let db1 = mongoose.createConnection(uri);
let db2 = mongoose.createConnection("mongodb://localhost/myDB2");
//let db1 = mongoose.createConnection(uri);
/* let db1 = mongoose.createConnection(uri, function(error){
    if(error) console.log(error);
    else console.log("connection successful");
});  */

//let db1 = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });
 /* let db1 = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
    if(error) console.log(error);
    else console.log("connection successful");
}); */ 

//define the company schema
var companySchema = new Schema({
    "companyName": String,
    "address": String,
    "phone": String,
    "employeeCount": {
        type: Number,
        default: 0
    },
    "country": String
});

//register the Company model using the companySchema
// use the companies collection in the db to store documents
//var Company = mongoose.model("companies", companySchema);
var Company = db1.model("companies", companySchema);

//create a new company document
var kwikEMart = new Company({
    companyName: "myCompany",
    address: "Toronto",
    phone: "416-332-3334",
    employeeCount:3000,
    country:"Canada"
});

//save the company document
/*
kwikEMart.save((err)=>{
    if (err) console.log("Error in saving Kwik");
    else console.log("Success, saved Kwik");
    //exit the program after saving
    process.exit();
});
*/
// save and then findOne()
kwikEMart.save((err)=>{
    if (err) console.log("Error in saving Kwik");
    else {
        console.log("Success, saved Best Buy");
        Company.findOne({companyName: "myCompany"}, "companyName phone address")
        //Company.find({companyName: "Best Buy"})
        //Company.find({})
        //Company.find({employeeCount: {$gt:20}},"companyName address")
       // more about conditions, https://docs.mongodb.com/manual/reference/operator/query/gt/
        .exec()
        .then((company)=>{
            if (!company) console.log("Company not found");
            else console.log(company);
        //exit program after saving and finding
        process.exit();
        }).catch((err)=>{
            console.log("finding Error");
        });
    }
});