const fs = require("fs");
const crypto = require("node:crypto");

crypto.pbkdf2("Siddhartha123@", "salt", 50000, 50, "sha512", (error, key) => {
  console.log(`1 - Siddhartha123@ done`);
});

fs.readFile("./file.txt", "utf8", () => {
  console.log("file reading CB");
});

crypto.pbkdf2("Siddhartha123@", "salt", 50000, 50, "sha512", (error, key) => {
  console.log(`2 - Siddhartha123@ done`);
});

crypto.pbkdf2("Siddhartha123@", "salt", 50000, 50, "sha512", (error, key) => {
    console.log(`3 - Siddhartha123@ done`);
  });
  
  crypto.pbkdf2("Siddhartha123@", "salt", 50000, 50, "sha512", (error, key) => {
    console.log(`4 - Siddhartha123@ done`);
  });
  crypto.pbkdf2("Siddhartha123@", "salt", 50000, 50, "sha512", (error, key) => {
    console.log(`5 - Siddhartha123@ done`);
  });
  