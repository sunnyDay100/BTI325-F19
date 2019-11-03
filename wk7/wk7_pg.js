//wk7_ps.js
const Sequelize = require("sequelize");

//set up sequelize to point to postgres database
// available on Heroku -> addon ->postgress-> credential, refer to notes
// input your db credential
var sequelize = new Sequelize("database", "user", "password", 
{   host: "host",
    dialect: "postgres",
    port: 5432,
    dialectOptions:{ssl: true}
});

// input your db credential
var sequelize = new Sequelize("database", "user", "password", 
{   host: "host",
    dialect: "postgres",
    port: 5432,
    dialectOptions:{ssl: true}
});


sequelize.authenticate()
        .then(()=>console.log("connection success"))
        .catch(()=>console.log("connection failed."));


//define a "Project" model
/*
var tableProj = sequelize.define("Project", {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
});
*/

//define a "Project" model with primary Key 

var tableProj = sequelize.define("Project3",{
    proj_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: Sequelize.STRING,
    description: Sequelize.TEXT
}, {
    createdAt: false,
    updatedAt: false
});


//synchronize the Database with models and 
//automatically add the table if it doesn't exist
sequelize.sync().then(()=>{
    //create a new "Project" and add it to the database
    tableProj.create({
        title: "proj3",
        description:"3rd proj"
    }).then((proj)=>{
        // can access the Project via variable proj
        console.log("success");
    }).catch((error)=>{
        console.log("db create error. ");
    });
});
