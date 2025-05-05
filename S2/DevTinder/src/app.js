const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
  res.send("Server is working!");
});

app.listen(3000, () => {
  console.log("Server is listening");
});
