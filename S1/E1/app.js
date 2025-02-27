require("./xyz.js");
const { sum, x } = require("./sum.js");

// console.log(globalThis);

console.log(global === globalThis);

//Sum
let a = 10;
let b = 27;

console.log(sum(a,b));
// console.log(x);
