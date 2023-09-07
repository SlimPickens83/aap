const express = require("express")
const router = express.Router()
const userController = require("./controllers/UserController")
const clientController = require("./controllers/ClientController")
const adminController = require("./controllers/AdminController")
const cors = require("cors")

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200
}

router.use(cors(corsOptions))

console.log("Router is running.")

router.get("/", (req, res) => res.json("Hello, if you see this message that means your backend is up and running successfully."))

// Check token. Will log out on front end if expired.
router.post("/checkToken", userController.checkToken)

// User routes
router.post("/register", userController.register)
router.post("/login", userController.login)

// Admin routes
router.post("/adminLogin", adminController.authenticate)

// Client routes
router.post("/clientAuth", clientController.ifClientExists, clientController.clientData)
router.post("/clientRegister", clientController.register)

// Dashboard routes
router.get("/Dashboard/clients", clientController.allClients)

module.exports = router
