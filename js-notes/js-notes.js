//------------------------ javaScript Notes --------------------------

//1. Hosting ------------------------------------------

// Hosting can happen both fot the var, let and const
//Example of var:
x = 20;
console.log(`Value is: ${x}`)
var x = 10
console.log(`Value is: ${x}`)
//Output
// Value is 20 and value is 10

// Let and conts are hoisted but we can not access them because of the Temporal Dead Zone(TDZ)
//Example of let and const:
x = 20;
console.log(`Value is: ${x}`)
let x = 10
console.log(`Value is: ${x}`)

//Output: It will give some errors


//2. Task Queue -----------------------------------------------------------

// There are two types of Queue:

// Task Queue --> setTimeout, setInterval, DOM Eveni Litiner
// MicroTask Queue --> promises

// MicroTask Queue has higher priority than the Task Queue so it execute first in the event loop.

//Example: 
console.log("I am first text");

setTimeout( () => {
    console.log("I am second text");
}, 0 );

Promise.resolve().then( () => {
    console.log("I am third text")
});

console.log("I am forth text");

//Output:
//I am first text
//I am forth text
//I am third text
//I am second text


//3. Objects in JavaScript----------------------------------------

// [ Before ES6 we can create objects unsing object literals and constructor function.
// After ES6 we can create objects using class as well. 
// Before we use the constructor function because we do no have the concept of class in javascript, but after ES6 we can use class concept to create objects.]

// Object Literals -->

//Example:
const myObj = {
    name: shilpa,
    location: kolkata,
    getDist: function() {
        console.log("North 24 Pargana");
    }
}
console.log(myObj.name);
console.log(myObj.getDist);

// Class based object creation -->

//Example:

class Person {
    constructor(fname, lname, contact) {
        this.fname = fname;
        this.lname = lname;
        this.contact = contact;
    }

    getName() {
        console.log(`My name is ${this.fname} ${this.lname}`);
    }

    getContact() {
        console.log(`My contact number is ${this.contact}`);
    }
}

const person1 = new Person("Shilpa", "Mukherjee", 1234567894);
const person2 = new Person("Aahi", "Mukherjee", 7777777777);
console.log(person1.fname);
console.log(person1.getContact());
console.log(person2.getName());

//Output:
// Shilpa
// My contact number is 1234567894
// My name is Aahi Mukherjee


// 4. Prototypes and Inheritance in javaScript -------------------------------------------------------

// [ Prototypes are the mechanism by which javaScript objects inherit features from one to another. Every javaScript object has a prototype property which is a reference to another object. ]

// prototype → Property of a function that will be shared by objects created with new.
// __proto__ → Property of an object that points to its parent prototype for inheritance.

instance.__proto__ === Constructor.prototype

// Example
const protoTypeObj = {
    fname: "Shilpa",
    lname: "Mukherjee",
    getFullName() {
        return `${this.fname} ${this.lname}`;
    },
};

const obj1 = Object.create(protoTypeObj);
console.log(obj1.getFullName());
//Output:
// Shilpa Mukherjee

obj1.__proto__.fname = "Aahi";
console.log(protoTypeObj.fname);
//Output:
// Aahi


// 5. Promises in javascript -------------------------------------------------------
//[ A promise is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value. ]