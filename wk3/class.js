//class.js - Using key word class
class Teacher{
    constructor(sName, sAge){
        this.name = sName;
        this.age = sAge;
        this.occupation = "teacher";
    }
    setName(newName) {this.name = newName;}
    setAge(newAge) {this.age = newAge;}
    getName() {return this.name;}
    getAge() {return this.age;}

} // end of class

var teacher1 = new Teacher("Joe", 34);
var teacher2 = new Teacher("Mary", 46);

teacher1.setName("Kate");
console.log(teacher1.getName());
console.log(teacher2.getName());