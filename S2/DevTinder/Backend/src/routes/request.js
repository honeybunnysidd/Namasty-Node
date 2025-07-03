const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

//Send the Connection Request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const { status, toUserId } = req.params;

      if (!toUserId || !fromUserId) {
        throw new Error("Something went wrong");
      }

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type : " + status });
      }

      //handle self request - not allowed
      if (fromUserId == toUserId) {
        return res.status(404).send("You cannot send request itself");
      }

      //toUserId is present in the db or not
      const isPresentToUserId = await User.findById(toUserId);
      if (!isPresentToUserId) {
        return res.status(404).send("User not exist");
      }

      //If there is an existing connectionRequest
      const isExist = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { toUserId: fromUserId, fromUserId: toUserId },
        ],
      });

      if (isExist) {
        throw new Error("Already sent the request");
      }
      const connectionStatus = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionStatus.save();
      res.json({
        message: `${req.user.firstName} is ${status} the profile of ${isPresentToUserId.firstName}`,
        data,
      });
    } catch (err) {
      res.status(400).send("Error : " + err.message);
    }
  }
);

//Review request either accepted or rejected
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const { status, requestId } = req.params;
      const loggedUser = req.user;

      //Validate the status (reject or accept only)
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type : " + status });
      }

      // requestId is present in db or not
      const requestIdValid = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedUser._id,
        status: "interested",
      });
      if (!requestIdValid) {
        throw new Error("The request not exist");
      }

      await ConnectionRequest.findByIdAndUpdate(requestId, { status: status });

      res.send(`Request has been ${status}`);
    } catch (err) {
      res.status(404).send("Error : " + err.message);
    }
  }
);

module.exports = requestRouter;
