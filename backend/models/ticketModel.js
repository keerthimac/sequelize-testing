module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define(
    "ticket",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "new",
      },
    },
    {
      freezeTableName: true,
    }
  );
  return Ticket;
};
