const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  //01 Initialize variable for token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //03 Get token from header
      token = req.headers.authorization.split(" ")[1];
      //04 Verify Token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      //05 Get user from token via server
      req.user = await await User.findAll(
        {
          attributes: ["id", "email", "name"],
        },
        {
          where: {
            id: verified.id,
          },
        }
      );
      //   console.log(req.user);
      //06 next function
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

module.exports = { protect };
