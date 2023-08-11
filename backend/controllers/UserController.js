const User = require("../models/User")

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

      res.json(result)
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

// exports.home = function (req, res) {
//   if (req.session.user) {
//     res.send((draft.loggedIn = true))
//   } else {
//     res.send((state.loggedIn = false))
//   }
// }
