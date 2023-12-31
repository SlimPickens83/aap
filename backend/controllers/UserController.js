const User = require("../models/User")
const jwt = require("jsonwebtoken")

// Tokens expire after one week.
const tokenLasts = "7d"

exports.checkToken = function (req, res) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
    res.json(true)
  } catch (e) {
    res.json(false)
  }
}

exports.login = function (req, res) {
  console.log("*NEW LOGIN*")

  let user = new User(req.body)
  console.log("user in UserController.js, exports.login:")
  console.log(user)
  user
    .login()
    .then(function (result) {
      console.log("result in UserController.js, exports.login:")
      console.log(result)

      res.json({
        token: jwt.sign({ _id: user.data._id, username: user.data.username }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: user.data.username
      })
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.register = function (req, res) {
  let user = new User(req.body)
  user
    .register()
    .then(() => {
      console.log("**TOKEN START**")
      res.json({
        token: jwt.sign({ _id: user.data._id, username: user.data.username }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        username: user.data.username
      })
      console.log("**TOKEN END**")
    })
    .catch(regErrors => {
      console.log(`Errors in UserController.js, exports.register: ${regErrors}`)
      res.status(500).send(regErrors)
    })
}

exports.loginStatus = function (req, res, next) {
  try {
    if (loggedIn) {
      next()
    }
  } catch (e) {
    res.status(500).send("You must be looged in to view this page.")
  }
}
