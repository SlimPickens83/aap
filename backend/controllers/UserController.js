const User = require("../models/User")

exports.login = function (req, res) {
  console.log(req.body)
  let user = new User(req.body)
  console.log(user)
  user
    .login()
    .then(function (result) {
      res.json({
        username: user.data.username,
        loggedIn: user.loggedIn
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
      res.json({
        user: user
      })
    })
    .catch(regErrors => {
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
