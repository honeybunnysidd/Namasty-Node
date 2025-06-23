const express = require("express");
const { adminAuth, userAuth } = require("../middlewares/auth.js");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res, next) => {
  res.send("This is your data");
  next();
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the data");
});

//User Auth
app.get("/user/login", (req, res) => {
  res.send("You are logged in");
});

app.get("/user/profile", userAuth, (req, res) => {
  res.send("This is your profile");
});

app.post("/user/update", (req, res) => {
  res.send("req post of profile");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

//Incedo
