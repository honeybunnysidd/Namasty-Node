const express = require("express");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

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
    const updateUser = req.body;
    const { _id } = req.user;

    await User.findByIdAndUpdate(
      _id,
      { updateUser },
      { runValidators: true, new: true }
    );
    res.send("Id : " + _id);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = profileRouter;
