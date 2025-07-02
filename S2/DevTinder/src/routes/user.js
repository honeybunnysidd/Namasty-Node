const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();

const USER_POPULATE_DATA = "firstName lastName age gender about skills";

//Get all the pending request
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", USER_POPULATE_DATA);

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
    })
      .populate("fromUserId", USER_POPULATE_DATA)
      .populate("toUserId", USER_POPULATE_DATA);

    if (connectionRequest.length < 1) {
      return res.send("There are no connection");
    }
    const data = connectionRequest.map((el) => {
      if (el.fromUserId._id.toString() === loggedUser._id.toString()) {
        return el.toUserId;
      } else {
        return el.fromUserId;
      }
    });

    res.json({ data });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

module.exports = userRouter;
