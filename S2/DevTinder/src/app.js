const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Namaste Developers");
});

app.use("/test", (req, res) => {
  res.send("I am Tester");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
