const Admin = require("../models/Admin")

exports.authenticate = function (req, res) {
  let admin = new Admin(req.body)
  admin
    .authenticate()
    .then(function (result) {
      res.json({
        admin: admin.authentic
      })
    })
    .catch(function (e) {
      res.json(false)
    })
}
