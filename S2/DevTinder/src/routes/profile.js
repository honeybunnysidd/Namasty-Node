const express = require("express");

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const profileRouter = express.Router();

//Get the user profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Update the profile
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Not allowed to update the user's fields");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    await User.findByIdAndUpdate(user._id, user, {
      runValidators: true,
      new: true,
    });
    res.send(user.firstName + " your profile has been updated successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Update the password
profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send("Both old and new passwords are required");
    }

    const user = req.user;
    const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);

    if (!isValidOldPassword) {
      throw new Error("Old password is incorrect");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password must be Strong");
    } else {
      const newPasswordHash = await bcrypt.hash(newPassword, 10);
      const user2 = await User.findByIdAndUpdate(
        user._id,
        { password: newPasswordHash },
        { runValidators: true, new: true }
      );
      res.send("Password changed successfully");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
