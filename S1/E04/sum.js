function sum(a, b) {
  const sum = a + b;

  console.log(`${a} + ${b} = ${sum}`);
}
function substract(a, b) {
  const substract = a - b;

  console.log(`${a} - ${b} = ${substract}`);
}

//By default module protects variable and function
//so we do it intentionally
module.exports = { sum, substract };
