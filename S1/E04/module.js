require("./sum"); // It execute the file and not give access of variable/function to this file
let { sum, substract } = require("./sum"); // Access of variable/function of other file here

sum(10, 27);
substract(10, 27);
