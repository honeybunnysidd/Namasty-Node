const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName && !lastName) {
    throw new Error("First Name or Last name missing");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter Strong Password");
  }
};

const validateEditProfileData = (req) => {
  const userEditKey = Object.keys(req.body);
  const allowedField = [
    "firstName",
    "lastName",
    "age",
    "about",
    "skills",
    "gender",
    "photoUrl",
  ];

  const isEditAllowed = userEditKey.every((key) => allowedField.includes(key));

  return isEditAllowed;
};

module.exports = { validateSignUpData, validateEditProfileData };
