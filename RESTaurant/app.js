const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const Company = require("./models/company");
const Menu = require("./models/menu");
const Location = require("./models/location")
const setupDb = require("./db/setupDb");

const app = express();

const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

const setupApp = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static("public"))
  app.engine("handlebars", handlebars);
  app.set("view engine", "handlebars");
  app.set("views", path.join(__dirname, "views"));
};
setupApp();

// Get all the companies
app.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  if (!companies) {
    return res.sendStatus(404);
  }
  // TODO: res.json(companies);
  // TODO: res.sendStatus(200)
  res.render("home", { companies });
});

// Get a specific company by it's id
app.get("/companies/:id", async (req, res) => {
  const company = await Company.findByPk(req.params.id, {
    include: [Menu, Location]
  });

  if (!company) {
    return res.sendStatus(404);
  }

  res.render("company", { company });
});

// Create a new company
app.post("/companies", async (req, res) => {
  const { name, logoUrl } = req.body;

  if (!name || !logoUrl) {
    res.sendStatus(400);
    return;
  }

  const company = await Company.create({ name, logoUrl });
  res.status(201).json(company);
});

// Delete a company
app.delete("/companies/:id", async (req, res) => {
  const id = req.params.id;
  const company = await Company.findByPk(id);

  if (!company) {
    return res.sendStatus(404);
  }

  await company.destroy();
  res.sendStatus(200)
  // res.redirect("/companies");
});

// Replace a company
app.put("/companies/:id", async (req, res) => {
  const id = req.params.id;
  const company = await Company.findByPk(id);

  if (!company) {
    return res.sendStatus(404);
  }

  await company.update(req.body);
  res.sendStatus(200);
});

// Get all company's menus
app.get("/companies/:id/menus", async (req, res) => {
  const companyId = req.params.id;
  const menus = await Menu.findAll({
    where: {
      companyId: companyId,
    },
  });
  if (!menus) {
    return res.sendStatus(404);
  }
  res.json(menus)
});

// Get a specific menu by its id
app.get("/menus/:id", async (req, res) => {
  const id = req.params.id;
  const menu = await Menu.findByPk(id);
  if (!menu) {
    return res.sendStatus(404);
  }
  res.json(menu);
  res.sendStatus(200);
});

// Create a new menu
app.post("/companies/:id/menus", async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findByPk(companyId);

  if (!company) {
    return res.sendStatus(404);
  }

  const { title } = req.body;

  if (!title) {
    return res.sendStatus(400);
  }

  await company.createMenu({ title });

  const url = "/companies/" + companyId
  res.redirect(url);
});

// Delete a menu
app.delete("/menus/:id", async (req, res) => {
  const id = req.params.id;
  const menu = await Menu.findByPk(id);

  if (!menu) {
    return res.sendStatus(404);
  }

  await menu.destroy();
  res.sendStatus(200);
});

// Create a new location
app.post("/companies/:id/locations", async (req, res) => {
  const companyId = req.params.id;
  const company = await Company.findByPk(companyId);

  if (!company) {
    return res.sendStatus(404);
  }

  const { name, capacity, manager } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  await company.createLocation({ name, capacity, manager });
  const url = "/companies/" + companyId
  res.redirect(url);
});

// Get all company's locations
app.get("/companies/:id/locations", async (req, res) => {
  const companyId = req.params.id;
  const locations = await Location.findAll({
    where: {
      companyId: companyId,
    },
  });
  if (!locations) {
    return res.sendStatus(404);
  }
  res.json(locations);
});

setupDb();

module.exports = app;
