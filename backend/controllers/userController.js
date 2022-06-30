const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const User = require("../models/userModel");

// @desc Register a new user
// @route POST/api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Initiate table
  await User.sync();

  //Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please include all fields");
  }

  //find user already exists
  const findUser = await User.findOne({
    where: {
      email: email,
    },
  });

  if (findUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token: jwtGenerator(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

module.exports = {
  registerUser,
};
