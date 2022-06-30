const express = require("express");
const colors = require("colors");
const connectDB = require("../backend/config/database");

//connect to Database
connectDB();

const app = express();

const PORT = 5000;

app.listen(PORT, console.log(`Server started on port ${PORT} `));
