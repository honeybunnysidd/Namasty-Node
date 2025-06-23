const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

//DataBase Connection
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Error : ", err);
  });
