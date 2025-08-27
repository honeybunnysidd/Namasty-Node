const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("../utils/validation");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// signup the user
authRouter.post("/signup", async (req, res) => {
	try {
		//Validating the given user's data
		validateSignUpData(req);
		const {
			firstName,
			lastName,
			gender,
			age,
			emailId,
			password,
			about,
			photoUrl,
		} = req.body;
		const passwordHash = await bcrypt.hash(password, 10);

		//Make instance of sign up user
		const user = new User({
			firstName,
			lastName,
			gender,
			age,
			emailId,
			about,
			photoUrl,
			password: passwordHash,
		});

		//Add into DB
		await user.save();
		res.send("Sign up successfully");
	} catch (err) {
		res.status(400).send(" : " + err.message);
	}
});

//login user
authRouter.post("/login", async (req, res) => {
	try {
		const { emailId, password } = req.body;

		//Find user through email
		const user = await User.findOne({ emailId: emailId });
		if (!user) {
			throw new Error("Invalid Credentails");
		} else {
			//Check user enter correct password or not
			const isValidPassword = await bcrypt.compare(
				password,
				user.password
			);
			if (!isValidPassword) {
				throw new Error("Incorrect Password");
			} else {
				//Creating JWT token
				const token = await jwt.sign({ _id: user._id }, "secretCode", {
					expiresIn: "1d",
				}); // Client JS access nahi kar sakta(use httpOnly : true)

				//Add the token into cookies
				res.cookie("token", token, { httpOnly: true }); //httpOnly Client JS access nahi kar sakta
				res.send(user);
			}
		}
	} catch (err) {
		res.status(400).send("Error : " + err.message);
	}
});

//logout user
authRouter.post("/logout", async (req, res) => {
	try {
		//Clear the token from the cookies
		res.cookie("token", null, { expires: new Date(Date.now()) });
		res.send("Log out successfully");
	} catch (err) {
		res.status(400).send("Error : " + err.message);
	}
});

module.exports = authRouter;
