const Cinema = require("./cinema")
const Movie = require("./movie")
const db = require("./db")
const Screening = require("./screening")

async function setupDb(){
    Cinema.hasMany(Screening)
    Screening.belongsTo(Cinema)
    Movie.hasMany(Screening)
    Screening.belongsTo(Movie)
    await db.sync({ force: true, logging: console.log });
}

module.exports = setupDb