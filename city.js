const sequelize = require("./db");
const { DataTypes, Model } = require("sequelize");

class City extends Model {}

City.init(
  {
    name: DataTypes.STRING,
    population: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "city",
    timestamps: false,
  }
);

module.exports = City;
