// Function Constructor: obj_new.js
function Teacher(sName, sAge)
{
    this.name = sName;
    this.age = sAge;
    this.occupation = "teacher";
    this.printInfo = function(){ console.log(this.name + " is a " + this.occupation);}
}

var teacher1 = new Teacher("Joe", 34);
var teacher2 = new Teacher("Mary", 46);
//var teacher3 = new Teacher(19);
teacher1.printInfo();
//teacher3.printInfo();

Teacher.prototype.setName = function(newName) {this.name = newName;}
Teacher.prototype.setAge = function(newAge) {this.age = newAge;}
Teacher.prototype.getName = function() {return this.name;}
Teacher.prototype.getAge = function() {return this.age;}
Teacher.prototype.getOcc = function() {return this.occupation;}
Teacher.prototype.outputName = function() {console.log(this.name);}
// asynchronous
Teacher.prototype.outputNameDelay = function(){
   var that = this;
    setTimeout(function(){
        //console.log(this.name);
       console.log(that.name);
    }, 1000);
    console.log("Now..."+ this.name);
};

Teacher.prototype.outputNameDelayArrow = function(){
    setTimeout(()=>{console.log(this.name);},1000);
 };

console.log(teacher1.getName());
console.log(teacher2.getName());

teacher1.outputName();
teacher1.outputNameDelay();
teacher1.outputNameDelayArrow();