const Cinema = require("./cinema");
const Movie = require("./movie")
const Screening = require("./screening")
const setupDb = require("./setupDb");

async function sandbox() {
  await setupDb()

  const kingsCross = await Cinema.create({
    location: "Kings Cross",
    numOfScreens: 5,
  });

  const shoreditch = await Cinema.create({
    location: "Shoreditch",
    numOfScreens: 3,
  });

  const bond = await Movie.create({
    title: "No Time to Die",
    durationMins: 163
  })

  const s1 = await Screening.create({
    startTime: new Date(),
    screen: 2,
    movieId: bond.id,
    cinemaId: kingsCross.id
  })

}

sandbox();
