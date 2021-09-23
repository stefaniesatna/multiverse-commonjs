const City = require("./city");
const setupDb = require("./setupDb");

async function sandbox() {
  await setupDb()

  const london = await City.create({
    name: "London",
    population: 9000000,
  });

  const madrid = await City.create({
    name: "Madrid",
    population: 3000000,
  });

  const nelson = await london.createLandmark({
    name: "Nelson's Column"
  })

  const eye = await london.createLandmark({
    name: "London Eye"
  })

  const plaza = await madrid.createLandmark({
    name: "Plaza Mayor"
  })
}

sandbox();
