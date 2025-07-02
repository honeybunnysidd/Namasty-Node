const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

//Get all the pending request
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "about",
      "skills",
      "gender",
    ]);

    if (connectionRequest.length < 1) {
      return res.send("There are no such peding requests");
    }

    res.json({
      message: "These are your pending requests",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Get the all user connection (accepted)
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedUser._id, status: "accepted" },
        { fromUserId: loggedUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "about",
      "skills",
      "gender",
    ]);

    const data = connectionRequest.map((el) => el.fromUserId);

    if (connectionRequest.length < 1) {
      return res.send("There are no connection");
    }

    res.json({
      data,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = userRouter;
