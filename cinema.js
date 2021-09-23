const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class Cinema extends Model {}

Cinema.init(
  {
    location: DataTypes.STRING,
    numOfScreens: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "cinema",
    timestamps: false,
  }
);

module.exports = Cinema;
