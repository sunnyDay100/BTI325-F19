//wk8
// Mongo connection
//mongodb+srv://Sunny:<password>@senecaweb-ypfi5.mongodb.net/test?retryWrites=true&w=majority


var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
var Schema = mongoose.Schema;

//connect to localhost mongo running on default port 27017
mongoose.connect("mongodb://localhost/myDB", { useNewUrlParser: true, useUnifiedTopology: true });


//define the company schema
var companySchema = new Schema({
    "companyName": {
        type: String,
        unique: true  // can be dropped using: db.companies.dropIndexes()
    },
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
    companyName: "The Kwik-E-Mart",
    address: "Springfield",
    phone: "212-332-3334",
    employeeCount:3,
    country:"USA"
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
    if (err) console.log("Error in saving Kwik:"+ err.message);
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