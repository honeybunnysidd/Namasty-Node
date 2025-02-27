const { sum, divide, subtract, multiply } = require("./Calculate");
let a = 10;
let b = 5;

sum(a, b);
divide(a, b);
subtract(a, b);
multiply(a, b);

(function () {
  console.log("I'm Anonymous function");
})();