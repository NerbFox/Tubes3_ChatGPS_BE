const express = require("express")
const app  = express()

app.get("/", (req, res) => console.log("Masuk"))

app.listen(5000, console.log("HELLO"))