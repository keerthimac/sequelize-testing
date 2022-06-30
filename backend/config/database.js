const Sequelize = require("sequelize");

const db = new Sequelize("codegig", "root", "0542222175", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log(`connection successful`.cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);
  }
};

module.exports = connectDB;
