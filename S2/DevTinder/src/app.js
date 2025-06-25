const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

//Read the user from the database
app.get("/user", async (req, res) => {
  try {
    const data = await User.find({});
    if (data.length === 0) {
      res.status(404).send("User not found");
    } else {
      console.log("Data Fetch");
      res.send(data);
    }
  } catch (err) {
    res.send("Something went wrong");
  }
});

//Add the user in the database
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(401).send("Error occured");
  }
});

//Delete the user from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("user deleted successfully");
  } catch (err) {
    res.status(404).send("user deleted successfully");
  }
});

//Update the data in the database
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const data = await User.findByIdAndUpdate(
      userId,
      { firstName: "Siddhartha" },
      { new: true }
    );
    console.log(data);
    res.send("Data updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});
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
