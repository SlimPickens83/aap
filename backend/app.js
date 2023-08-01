const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const app = express()

let sessionOptions = session({
  secret: process.env.SESSIONSECRET,
  store: MongoStore.create({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})

app.use(sessionOptions)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", require("./router"))

const server = require("http").createServer(app)

console.log("App is running.")

module.exports = server
