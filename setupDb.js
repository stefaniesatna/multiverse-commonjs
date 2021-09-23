const City = require("./city")
const Landmark = require("./landmark")
const db = require("./db")

async function setupDb(){
    City.hasMany(Landmark)
    Landmark.belongsTo(City)
    await db.sync()
}

module.exports = setupDb