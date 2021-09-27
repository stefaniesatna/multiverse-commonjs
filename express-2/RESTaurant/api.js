const express = require("express");
const sequelize = require("./db");

const Company = require("./company");
const Menu = require("./menu");
const Location = require("./location");
const setupDb = require("./setupDb");

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get all the companies
app.get("/companies", async (req, res) => {
  const companies = await Company.findAll();
  if (!companies) {
    return res.sendStatus(404);
  }
  res.json(companies);
  res.sendStatus(200);
});

// Get a specific company by it's id
app.get("/companies/:id", async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) {
    return res.sendStatus(404);
  }
  res.json(company);
  res.sendStatus(200);
});

// Create a new company
app.post("/companies", async (req, res) => {
  const { name, logoUrl } = req.body;
  await Company.create({ name, logoUrl });
  res.sendStatus(201);
});

// Delete a company
app.delete("/companies/:id", async (req, res) => {
  const id = req.params.id;
  const company = await Company.findByPk(id);

  if (!company) {
    return res.sendStatus(404);
  }

  await company.destroy();
  res.sendStatus(200);
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
  if (!menus || menus.length === 0) {
    return res.sendStatus(404);
  }
  res.json(menus);
  res.sendStatus(200);
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
  res.sendStatus(201);
});

// Delete a menu
app.delete("/menus/:id", async (req, res) => {
    const id = req.params.id
    const menu = await Menu.findByPk(id)

    if(!menu){
        return res.sendStatus(404)
    }

    await menu.destroy()
    res.sendStatus(200)
})

// Create a new location
app.post("/companies/:id/locations", async (req, res) => {
    const companyId = req.params.id
    const company = await Company.findByPk(companyId)
    
    if (!company) {
        return res.sendStatus(404)
    }

    const {name, capacity, manager} = req.body

    if (!name){
        return res.sendStatus(400)
    }

    await company.createLocation({ name, capacity, manager })
    res.sendStatus(201)
})

setupDb()

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
