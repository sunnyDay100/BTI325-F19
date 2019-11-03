//wk8
// Mongo connection
//mongodb+srv://Sunny:<password>@senecaweb-ypfi5.mongodb.net/test?retryWrites=true&w=majority

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//connect to localhost mongo running on default port 27017
var uri = "mongodb://localhost/myDB";
//var uri = "mongodb+srv://Sunny:<password>@senecaweb-ypfi5.mongodb.net/bti325_wk8?retryWrites=true&w=majority";

//connect to localhost mongo running on default port 27017
//mongoose.connect("mongodb://localhost/myDB");
//mongoose.connect("mongodb://localhost/myDB", { useNewUrlParser: true, useUnifiedTopology: true });
//let db1 = mongoose.createConnection("mongodb://localhost/myDB", { useNewUrlParser: true, useUnifiedTopology: true });
//let db1 = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db1 = mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(error){
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
//var Company = mongoose.model("companies", companySchema);
var Company = db1.model("companies", companySchema);

/* update() */
Company.update({companyName:"Best Buy"},
    {$set:{employeeCount:9}},
    {multi: false})
    .exec()
    .then(()=>console.log("Update success"))
    .catch(()=>{console.log("Update failed.")});


/* Company.updateOne({companyName:"Best Buy"},
    {$set:{employeeCount:111}})
   // {multi: false})
    .exec()
    .then(()=>{console.log("Update success");
              // process.exit();
            })
    .catch((err)=>{console.log("Update failed.")});
*/
//remove()
Company.deleteOne({employeeCount:111})
.exec()
.then(()=>console.log("Remove success"))
.catch((err)=>console.log("Remove failed."));
 
/*
//create a new company document
var kwikEMart = new Company({
    companyName: "Best Buy 2",
    address: "Springfield",
    phone: "212-332-3334",
    employeeCount:3000,
    country:"USA"
});

// save and then findOne()
kwikEMart.save((err)=>{
    if (err) console.log("Error in saving Kwik");
    else {
        console.log("Success, saved Best Buy");
        //Company.findOne({companyName: "Best Buy"})
        //Company.find({companyName: "Best Buy"}, "address phone")
       // Company.find({})
        Company.find({employeeCount: {$gt:20}},"companyName address")
       // more about conditions, https://docs.mongodb.com/manual/reference/operator/query/gt/
        .exec()
        .then((company)=>{
            if (!company) console.log("Company not found");
            else console.log(company[0].companyName);
        //exit program after saving and finding
        process.exit();
        }).catch((err)=>{
            console.log("finding Error");
        });
    }
});
*/
