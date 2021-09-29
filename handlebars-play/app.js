const express = require("express")
const app = express()
const port = 3000

const handlebars = require("express-handlebars")

app.set("view engine", "handlebars")

app.engine("handlebars", handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    defaultLayout: "index",
    partialsDir: `${__dirname}/views/partials`
}))

// Sends static index.js file from public folder
app.use(express.static("public"))

const fakeApi = () => {
    return [
        {
            name: "Katarina",
            lane: "midlaner"
        },
        {
            name: "Stefanie",
            lane: "toplaner"
        },
        {
            name: "Pt",
            lane: "toplaner"
        },
        {
            name: "Charlie",
            lane: "midlaner"
        },
        {
            name: "Christie",
            lane: "toplaner"
        },
    ]
}

const list = false;


app.get("/", (req, res) => {
    res.render("main", { suggestedChampions: fakeApi(), listExists: list });
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})