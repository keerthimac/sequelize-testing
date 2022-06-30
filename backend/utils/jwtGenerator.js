const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const jwtGenerator = (id) => {
  const jwtSecret = process.env.JWT_SECRET;
  const payload = { id };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
  return token;
};

module.exports = jwtGenerator;
