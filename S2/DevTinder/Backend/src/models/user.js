const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			minLength: 3,
		},
		lastName: {
			type: String,
		},
		emailId: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Email is not valid : " + value);
				}
			},
		},
		password: {
			type: String,
			required: true,
			validate(value) {
				if (!validator.isStrongPassword(value)) {
					throw new Error("Enter a Strong Password : " + value);
				}
			},
		},
		about: {
			type: String,
			maxLength: 100,
		},
		skills: {
			type: [String],
		},
		age: {
			type: Number,
			min: 18,
			max: 99,
		},
		gender: {
			type: String,
			enum: {
				values: ["male", "female", "other"],
				message: `{VALUE} is not supported.`,
			},
		},
		photoUrl: {
			type: String,
			validate(value) {
				if (!validator.isURL(value)) {
					throw new Error("Invalid Photo Url");
				}
			},
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
