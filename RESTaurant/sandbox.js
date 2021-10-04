const setupDb = require("./setupDb");
const Company = require("./company");
const Menu = require("./menu");
const Location = require("./location")

async function sandbox() {
  await setupDb();

  const islandPoke = await Company.create({
    name: "Island Poke",
    logoUrl:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1tr7g949k6uv1s2cx31wn2yt-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2017%2F02%2FIslandPoke_Logo_Hero.png&f=1&nofb=1",
  });

  const homeslice = await Company.create({
    name: "Homeslice",
    logoUrl:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fww1.prweb.com%2Fprfiles%2F2012%2F10%2F25%2F10058535%2Fhomeslice%2520logo.jpg&f=1&nofb=1",
  });

  const rosa = await Company.create({
    name: "Rosa's Thai",
    logoUrl: "https://albertdock.com/media/1770/rosa-thai-logo.jpg",
  });

  const menuIsland = await Menu.create({
    title: "Fishy Menu",
    companyId: 1,
  });

  const menuHomeslice = await Menu.create({
    title: "Pizzas",
    companyId: 2,
  });

  const menuRosa = await Company.create({
    title: "Curries",
    companyId: 3,
  });

  const kingsCross = await Location.create({
    name: "Kings Cross",
    capacity: 30,
    manager: "Laurie",
    companyId: 1,
  });

  const shoreditch = await Location.create({
      name: "Shoreditch",
      capacity: 30,
      manager: "Claire",
      companyId: 3
  })
}

sandbox();
module.exports = sandbox
