const express = require("express");

const profileRouter = express.Router();

//Get the user profile
profileRouter.get("/profile", (req, res) => {});

module.exports = profileRouter;
