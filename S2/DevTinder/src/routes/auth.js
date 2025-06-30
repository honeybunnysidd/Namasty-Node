const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");

const authRouter = express.Router();

// signup the user
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("Sign up successfully");
  } catch (err) {
    res.status(400).send("Error : " + err);
  }
});

//login user
// authRouter.post("/login", async (req, res) => {});

module.exports = authRouter;
