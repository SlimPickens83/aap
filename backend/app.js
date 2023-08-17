const express = require("express")
const app = express()
const jwt = require("jsonwebtoken")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", require("./router"))

const server = require("http").createServer(app)

console.log("App is running.")

module.exports = server
