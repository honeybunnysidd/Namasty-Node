// It execute the file and not give access of variable/function to this file
// require("./sum");

// Access of variable/function of other file here
// let { sum } = require("./sum");

//Mjs
/*
import { sum, substract } from "./Calculate";*/

//cjs
// sum(10, 27);

//mjs
// substract(27, 10);

const { sum, multiply } = require("./Calculate/index.js");
sum(10, 27);
multiply(10, 27);
