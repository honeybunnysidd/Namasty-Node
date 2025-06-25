const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

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
app.post("/user", async (req, res) => {
  try {
    //Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    console.log(err.message);
    res.status(400).send("Error : " + err);
  }
});

//login user
app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentails");
    } else {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error("Password incorrect");
      } else {
        res.send("Login Successfully");
      }
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
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
  const id = req.body.id;
  try {
    const data = await User.findByIdAndUpdate(
      id,
      {
        photoUrl: "https://sidd.png",
      },
      { new: true, runValidators: true }
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
