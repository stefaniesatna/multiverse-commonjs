const { Sequelize } = require("sequelize");
const path = require("path");

const dbPath = path.join(__dirname, "db.sqlite");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
  
});

module.exports = sequelize;
