const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://honeybunnysidd:Siddhartha1027%40@cluster0.ep5jryt.mongodb.net/devTinder"
  );
}

module.exports = connectDB;
