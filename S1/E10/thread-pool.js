const fs = require("fs");
const crypto = require("crypto");
process.env.UV_THREADPOOL_SIZE = 8;

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("1 - cryptoPBKDF2 done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("2 - cryptoPBKDF2  done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("3 - cryptoPBKDF2  done");
});
crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("4 - cryptoPBKDF2  done");
});

crypto.pbkdf2("password", "salt", 5000000, 50, "sha512", (err, key) => {
  console.log("5 - cryptoPBKDF2  done");
});

fs.readFile("./file.txt", "utf8", () => {
  console.log("File Reading CB");
});

// thread-pool default size = 4
// console.log - 4 callback function execute after x time then execute 5th callback function

// change thread-pool size = 8
// console.log - max 8 callback function execute after x time then execute 9th or other callback function

// change thread-pool size = 2
// console.log - max 2 callback function execute after x time then execute 3th or other callback function

//Not any fix order to print results because any callback function is returned then execute
