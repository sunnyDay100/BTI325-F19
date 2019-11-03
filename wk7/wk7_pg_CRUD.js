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

// for advanced query operations
const Op = Sequelize.Op;

var Name = sequelize.define("Name", {
    fName: Sequelize.STRING,
    lName: Sequelize.STRING
});
// Create

sequelize.sync().then(()=>{
    Name.create({
        fName: "Deepak",
        lName: "Last1"
    }).then(()=>{
        console.log("Soodeh created");
    });

    Name.create({
        fName: "Abdul",
        lName: "Last2"
    }).then(()=>{ console.log("Min created.")});

    Name.create({
        fName: "Alex",
        lName: "last3"
    }).then(()=>console.log("Serach created"));
});

//Read
sequelize.sync().then(()=>{
    //return all first names only
    // SELECT fName FROM Name ORDER BY fName 
    Name.findAll({
        attribues:['fName', 'lName'],
        order:['fName']
    }).then((data)=>{
        console.log("All  first names");
        for (let i = 0; i<data.length; i++)
        { console.log("id:" + data[i].id + ", fName: "+data[i].fName);}
    });
    
    // return all first names where id==2
    // SELECT * FROM Name WHERE id = 2
    /*
    Name.findAll({
        attributes:['fName'],
        where: {id: 2}
       // where: {id: 2, lName: "James"}  // AND
       // where: {id: {[Op.or]: [12, 13]}}
       // where: {[Op.or]: [{id:6},{id:5}]} // id = 4 or id =5
        // where: {id: {[Op.gt]:3}} // id > 3 
                //more: http://docs.sequelizejs.com/manual/tutorial/querying.html
    }).then((data)=>{
        console.log("All first names, where condition:");
        for (let i=0; i<data.length; i++)
        { console.log(data[i].fName);}
    });
*/
});



//Update
sequelize.sync().then(()=>{
    //update user last name to "James" where id==2
    Name.update(
        {lName:"James"},
        { where: {id:2}})
        .then(()=>{console.log("Update success.");})
        .catch(()=>console.log("Error update.")).;

    // Delete
    Name.destroy({ where: {id:3}})
        .then(()=>console.log("Delete success."));
});

//Delete
