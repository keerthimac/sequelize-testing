const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
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

//connect do database
connectDB();

//initiate db object
const db = {};

//add sequelize to db object
db.sequelize = sequelize;

// making user model to db object
db.user = require("./userModel")(sequelize, DataTypes);

//sync tables (optional)
const syncTables = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("table sync successful".cyan.underline);
  } catch (error) {
    console.log(`Error:${error.message}`.red.underline.bold);
  }
};
// //sync tables
// syncTables();

module.exports = db;
