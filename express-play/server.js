const express = require("express")

const app = express()
const port = 3000

app.use(express.static("public"))

app.get("/now", (req, res) => {
    const date = new Date()
    res.send(date)
})

app.get("/flipcoin", (req, res) => {
    const arr = ["heads", "tails"]
    res.send(arr[Math.floor(Math.random() * 2)])
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})