//Konzeptbeispiel

let greeting: string = "Hallo TypeScript";

let myNumber = 42;

let numbers: number[] = [10, 20, 30];

interface User {

    name: string;
    age: number;
    isMushroom: boolean;
}

let currentUser: User = {
    name: "Mario",
    age: 30,
    isMushroom: true
};


function add(a: number, b: number): number {
    return a + b;
}


console.log(greeting);
console.log("die zweite Variable:", myNumber);
console.log("Array: ", numbers);
console.log("Spielheld: ",currentUser);
console.log("Summe von 6 und 3: ", add(6, 3));
