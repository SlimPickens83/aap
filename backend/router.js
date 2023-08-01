const express = require("express")
const router = express.Router()
const userController = require("./controllers/UserController")
const clientController = require("./controllers/ClientController")
const adminController = require("./controllers/AdminController")
const cors = require("cors")

router.use(cors())

console.log("Router is running.")

router.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully."))

// User routes
router.post("/register", userController.register)
router.post("/login", userController.login)

// Admin routes
router.post("/adminLogin", adminController.authenticate)

// Client routes
router.post("/clientAuth", clientController.ifClientExists, clientController.clientData)
router.post("/clientRegister", clientController.register)

// Portal routes

// Job routes

// Invoice routes

module.exports = router
