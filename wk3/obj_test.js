//Object Literal & Prototype Inheritance: obj_test.js
var teacher={ name: "Sunny",
                age: 90,
                occupaton: "teacher",
                setAge: function(age){
                    this.age = age;
                },
                setName: function(name){
                    this.name = name;
                }
            }
var teacher1 = Object.create(teacher);
var teacher2 = Object.create(teacher);
console.log(teacher1.name);
console.log(teacher2.name);

teacher2.setName("Liz");
console.log(teacher2.name);

teacher.setOcc = function(occ){
    this.occupation = occ;
}
teacher2.setOcc("writer");
console.log(teacher2.occupation);

teacher.phone = "416-333-4444";
console.log(teacher1.phone);
console.log(teacher2.phone);



