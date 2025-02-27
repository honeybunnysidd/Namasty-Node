const fs = require("fs");

let a = 1027;

setImmediate(() => {
  console.log("SetImmdediate");
});

Promise.resolve("Promise").then(console.log);

fs.readFile("./read.txt", "utf-8", () => {
  console.log("Read Successfully");
});
setTimeout(() => {
  console.log("SetTimeout Expired");
}, 0);

process.nextTick(() => console.log("Process.nextTick"));

function printA() {
  console.log("a", a);
}
printA();
console.log("Final line of code");

//output
//  a 100;
//  Final line of code
//  SetTimeout Expired
//  SetImmediate
//  Read Successfully
