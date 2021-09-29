const express = require("express")

const app = express()
const users = {
    1: {name: "Stefanie", age: 24},
    2: {name: "Eliska", age: 25}
}
const port = 3000

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.post("/users", (req, res) => {
    const { name, age } = req.body
    console.log(name, age)
})

app.get("/users/:userId", (req, res) => {
    console.log(users[req.params.userId])
    return users[req.params.userId]
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

