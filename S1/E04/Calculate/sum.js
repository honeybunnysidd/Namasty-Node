function sum(a, b) {
  const result = a + b;

  console.log(`Sum of ${a} + ${b} = ${result}`);
}

//By default module protects variable and function
//so we do it intentionally. (CJS)
// module.exports = { sum };

// (MJS -EJS Module)
/* export function substract(a, b) {
  const substract = a - b;

  console.log(`${a} - ${b} = ${substract}`);
}
  */

module.exports = { sum };
