//wk8
// Mongo connection
//mongodb+srv://Sunny:<password>@senecaweb-ypfi5.mongodb.net/test?retryWrites=true&w=majority

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//connect to localhost mongo running on default port 27017
//mongoose.connect("mongodb://localhost/myDB");
//mongoose.connect("mongodb://localhost/myDB", { useNewUrlParser: true, useUnifiedTopology: true }); 

 mongoose.connect('mongodb://localhost/myDB', { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
    if(error) console.log(error);
    else console.log("connection successful");
}); 

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
var Company = mongoose.model("companies", companySchema);

//create a new company document
var kwikEMart = new Company({
    companyName: "Alex company",
    address: "Springfield",
    phone: "212-332-3334",
    employeeCount:3,
    country:"USA"
});

//save the company document

/* kwikEMart.save((err)=>{
    if (err) console.log("Error in saving Kwik");
    else console.log("Success, saved Kwik");
    //exit the program after saving
    process.exit();
}); */

// save and then findOne()
kwikEMart.save((err)=>{
    if (err) console.log(err);
    else {
        console.log("Success, saved Kwik");
        Company.find({companyName: "The Kwik-E-Mart"})
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