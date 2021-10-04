const Company = require("../models/company");
const Location = require("../models/location");
const Menu = require("../models/menu");
const db = require("./db");

async function setupDb() {
  Company.hasMany(Location);
  Location.belongsTo(Company);
  Company.hasMany(Menu);
  Menu.belongsTo(Company);

  await db.sync({ logging: false });
}

module.exports = setupDb;
