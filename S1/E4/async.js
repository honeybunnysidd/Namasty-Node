const fs = require("node:fs");
const https = require("node:https");

console.log("Hello Developers");

let a = 1646464;
let b = 5646684;

setTimeout(() => {
  console.log("Print after 5 sec");
}, 5000);

//sync - Block the main thread
fs.readFileSync("./read.text", "utf-8");
console.log("Read the above file");

https.get("https://dummyjson.com/products/1", (res) => {
  console.log("Fetch Successfully");
});

// Async
fs.readFile("./read.text", "utf-8", (err, data) => {
  console.log(`File data: `, data);
});

function multiply(a, b) {
  return a * b;
}
const c = multiply(a, b);
console.log(`Multiplication result is :`, c);
