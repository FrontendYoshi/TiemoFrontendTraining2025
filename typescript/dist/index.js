"use strict";
//Konzeptbeispiel
let greeting = "Hallo TypeScript";
let myNumber = 42;
let numbers = [10, 20, 30];
let currentUser = {
    name: "Mario",
    age: 30,
    isMushroom: true
};
function add(a, b) {
    return a + b;
}
console.log(greeting);
console.log("die zweite Variable:", myNumber);
console.log("Array: ", numbers);
console.log("Spielheld: ", currentUser);
console.log("Summe von 6 und 3: ", add(6, 3));
