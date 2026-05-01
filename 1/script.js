// // let name = "Artem";
// // console.log(name);
// // name = "John";
// // console.log(name);

// // const name = "Artem";
// // console.log(name);

// // const user = {
// //     name: "Artem",
// //     gender: "male",
// //     age: 30
// // };
// // console.log(user);
// // user.name = "John";
// // user.age = 31;
// // console.log(user);

// // const numbers = [1, 2, 3, 4, 5];
// // console.log(numbers);

// // numbers.push(6);
// // console.log(numbers);

// // let x = 'something';
// // console.log(x);
// // x = 3;
// // console.log(x);

// //Primitives: string, number, boolean, null, undefined, symbol

// //String
// const someText = "Hello, World!";
// console.log(typeof someText); // string

// //Number
// const someNumber = 42;
// console.log(typeof someNumber); // number

// //Boolean
// const isTrue = true;
// console.log(typeof isTrue); // boolean

// //Null
// const someNull = null;
// console.log(typeof someNull); // object (this is a known quirk in JavaScript)

// //Undefined
// let someUndefined;
// console.log(typeof someUndefined); // undefined

// //Symbol
// const someSymbol = Symbol();
// console.log(typeof someSymbol); // symbol

// //Reference types: object, array, function, date  - object

// //Array
// const someArray = [1, 2, 3, 4, 5];
// console.log(typeof someArray); // object

// //Object literal
// const someObjectLiteral = {
//     name: "Artem",
//     age: 30
// };
// console.log(typeof someObjectLiteral); // object

// //Function
// const someFunction = new Function();
// console.log(typeof someFunction); // function

// //Date
// const someDate = new Date();
// console.log(typeof someDate); // object

// let y = 5.23445723;

// console.log(y);
// console.log(typeof y);
// console.log(y.toPrecision(2)); // 5.23

// const x = 3;
// const y = 5;
// const z = x + y;
// console.log(z); // 8
// console.log(typeof z); // number


// const firstNumber = 10;
// const secondNumber = 20;

// let result 
// result = Math.round(3.8);
// result = Math.ceil(3.2);
// result = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100    


// console.log(result); // undefined

// let result;
// const firstName = "Artem";
// const lastName = "Smith";
// const fullName = firstName + " " + lastName;
// const age = 30;
// const greeting = "Hey There!";
// const message = `${greeting}, my name is ${fullName} and I am ${age} years old. `;
// result = message;

// //properties and methods
// result = fullName.length; // 11
// result = fullName.toUpperCase(); // "ARTEM SMITH"
// result = firstName.concat(" ", lastName); // "Artem Smith"
// result = result.toLowerCase();
// result = result.lastIndexOf("m");
// result = firstName.charAt(2); // "t"
// result = message.charAt(message.length - 1); // " "

// //substring
// result = fullName.substring(0, 5); // "Artem"
// //slice
// result = fullName.slice(0, 5); // "Artem"
// result = fullName.slice(-5); // "Smith"

// //split
// result = message.split(" ");

// //replace
// result = message.replace("Hey There!", "Hi!"); // "Hi!, my name is Artem Smith and I am 30 years old. "
// //includes
// result = message.includes("Artem"); // true

// console.log(result); // "Hi!, my name is Artem Smith and I am 30 years old. "



// const brand = "Mercedes";
// const model = "S-Class";
// const color = "Black";
// const year = 2022;

// let carHtml;

// carHtml = `
// <h2>Car Information</h2>
// <h3>${brand} ${model}</h3>
// <ul>
//     <li>Color: ${color}</li>
//     <li>Year: ${year}</li>
// </ul>`;



// document.body.innerHTML = carHtml;

// let name;
// let age;

// name = prompt("What is your name?");
// age = prompt("How old are you?");

// console.log(`Hello, ${name}! You are ${age} years old.`);

// const isAdult = 18;
// let userAge = prompt("How old are you?");
// userAge => isAdult ? console.log("You are an adult.") : console.log("You are not an adult.");


let dept1 = Number(prompt("How many sales did dept 1 have this month?"));
let dept2 = Number(prompt("How many sales did dept 2 have this month?"));

const getFeedback1 = (sales) => sales > 1000 ? "Dept 1: Great job!" : "Dept 1: Needs improvement.";
const getFeedback2 = (sales) => sales > 1000 ? "Dept 2: Good work!" : "Dept 2: Could be better.";

console.log(getFeedback1(dept1));
console.log(getFeedback2(dept2));

const getAverageFromBoth = (a, b) => (a + b) / 2;

console.log(`The average sales for both departments is: ${getAverageFromBoth(dept1, dept2)}`);

if (dept1 > dept2 * 1.35) {
    console.log("Dept 1 is ahead of Dept 2 by more than 35%!");
}

function printBonus() {
    if (dept1 > dept2 * 1.35) {
        console.log("Department 1 gets a bonus!");
    } else if (dept2 > dept1 * 1.35) {
        console.log("Department 2 gets a bonus!");
    } else {
        console.log("No department gets a bonus.");
    }

}

printBonus();

