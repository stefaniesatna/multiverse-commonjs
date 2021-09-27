const express = require("express")
const Company = require("./company")
const Menu = require("./menu")

const app = express()
const port = 4000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get("/companies", async (req, res) => {
    const companies = await Company.findAll()
    if (!companies){
        return res.sendStatus(404)
    }
    res.json(companies)
    res.sendStatus(200)
})

app.get("/companies/:id", async (req, res) => {
    const company = await Company.findByPk(req.params.id)
    if (!company) {
        return res.sendStatus(404)
    }
    res.json(company)
    res.sendStatus(200)
})

app.get("/companies/:id/menus", async (req, res) => {
    const companyId = req.params.id
    const menus = await Menu.findAll({
        companyId: companyId
    })
    res.json(menus)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})


