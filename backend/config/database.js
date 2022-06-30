const Sequelize = require("sequelize");

const sequelize = new Sequelize("support_desk", "root", "0542222175", {
  host: "localhost",
  dialect: "mysql",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `connection successful // connected to "${sequelize.config.database}" database`
        .cyan.underline
    );
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);
  }
};

module.exports = connectDB;
module.exports.database = sequelize;
