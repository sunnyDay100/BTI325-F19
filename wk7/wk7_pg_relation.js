const Sequelize = require("sequelize");

//set up sequelize to point to postgres database
// input your db credential
var sequelize = new Sequelize("database", "user", "password", 
{   host: "host",
    dialect: "postgres",
    port: 5432,
    dialectOptions:{ssl: true}
});


sequelize.authenticate()
        .then(()=>console.log("Connection Success"))
        .catch(()=>console.log("Connection failed."));

//  hasMany() relationship
//Define "User" & "Task" models
var User = sequelize.define("User", {
    name: Sequelize.STRING,
    title: Sequelize.STRING
});

var Task = sequelize.define("Task",{
    title: Sequelize.STRING,
    description: Sequelize.TEXT
});

// relationships
User.hasMany(Task);

//create 
sequelize.sync().then(()=>{
    User.create({
        name: "Jason",
        title: "Developer"
    }).then((user)=>{
        console.log("user created");
        Task.create({
            title: "Task1",
            description: "desc1",
            UserId: user.get("id")
        }).then(()=>console.log("Task1 created"));

        Task.create({
            title: "Task2",
            description: "Desc2",
            UserId: user.get("id")
        }).then(function(){console.log("Task2 created")});
    });

})