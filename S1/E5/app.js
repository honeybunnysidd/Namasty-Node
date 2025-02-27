const crypto = require("crypto");
// const crypto = require("node:crypto"); //same Meaning

var a = 1078698;
var b = 20986;

////pbkdf2 = (Password-Based Key Derivation Function 2) Sync
console.log("--------------------");
crypto.pbkdf2Sync("Siddhartha", "salt", 5000000, 50, "sha512");
console.log("Key Generated");

setTimeout(() => {
    console.log("call me right now !!!! ");
  }, 0);

//pbkdf2 = (Password-Based Key Derivation Function 2) Provides an asynchronous Password-Based Key Derivation Function 2
crypto.pbkdf2("Siddhartha", "salt", 50000, 50, "sha512", (err, key) => {
  console.log("Key: ", key);
});

function multiplyFn(x, y) {
    const result = a * b;
    return result;
  }
  
  var c = multiplyFn(a, b);
  
  console.log("Multiplication result is : ", c);