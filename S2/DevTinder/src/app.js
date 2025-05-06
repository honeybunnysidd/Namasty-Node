const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({ fName: "Siddhartha", lName: "Raghuvanshi" });
});

app.post("/user", (req, res) => {
  res.send("Data successfully saved to the DB");
});

app.use("/hello", (req, res) => {
  res.send("Server is working!");
});

// app.use("/", (req, res) => {
//   res.send("I am all path");
// });

app.listen(3000, () => {
  console.log("Server is listening");
});
