const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //Read the token from the req cookies
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Invalid Token");
    }
    //Validate token
    const decodedObj = await jwt.verify(token, "secretCode");

    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      res.status(401).send("User does not exist");
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

module.exports = { userAuth };
