const express = require("express");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { connection } = require("mongoose");

const userRouter = express.Router();

const USER_POPULATE_DATA =
	"firstName lastName age gender about skills photoUrl";

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

//Feed API for the logged in user
userRouter.get("/feed", userAuth, async (req, res) => {
	try {
		const loggedUser = req.user;

		const page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 10;

		limit = limit > 50 ? 50 : limit;

		const connectionRequest = await ConnectionRequest.find({
			$or: [{ fromUserId: loggedUser._id }, { toUserId: loggedUser._id }],
		}).select("fromUserId toUserId");

		const hiddenUser = new Set();
		connectionRequest.forEach((el) => {
			hiddenUser.add(el.fromUserId.toString());
			hiddenUser.add(el.toUserId.toString());
		});

		const users = await User.find({
			$and: [
				{ _id: { $nin: Array.from(hiddenUser) } },
				{ _id: { $ne: loggedUser._id } },
			],
		})
			.select(USER_POPULATE_DATA)
			.skip((page - 1) * limit)
			.limit(limit);

		res.send(users);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

module.exports = userRouter;
