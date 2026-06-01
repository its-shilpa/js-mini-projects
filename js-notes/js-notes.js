//------------------------ javaScript Notes --------------------------

//1. Hosting

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


//2. Task Queue

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


//3. Objects in JavaScript

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