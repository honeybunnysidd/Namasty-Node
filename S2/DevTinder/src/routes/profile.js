const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validation");

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

module.exports = profileRouter;
