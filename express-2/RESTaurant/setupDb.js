const Company = require("./company");
const Location = require("./location");
const Menu = require("./menu");
const db = require("./db");

async function setupDb() {
  Company.hasMany(Location);
  Location.belongsTo(Company);
  Company.hasMany(Menu);
  Menu.belongsTo(Company);

  await db.sync({ logging: console.log });
}

module.exports = setupDb;
