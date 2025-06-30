const express = require("express");

const authRouter = express.Router();

// signup the user
authRouter.post("/signup", async (req, res) => {});

//login user
authRouter.post("/login", async (req, res) => {});

module.exports = authRouter;
