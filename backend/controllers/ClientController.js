const Client = require("../models/Client")

exports.ifClientExists = function (req, res, next) {
  Client.findByKey(req.body.clientKey)
    .then(function (clientDocument) {
      console.log("clientDocument inside of ClientController.js, exports.ifClientExists:")
      console.log(clientDocument)
      req.clientMember = clientDocument
      next()
    })
    .catch(function (e) {
      res.json(false)
    })
}

exports.clientData = function (req, res) {
  console.log("req.clientMember in ClientController.js, exports.clientData:")
  console.log(req.clientMember)

  res.json({
    clientName: req.clientMember.clientName
  })
}

exports.register = function (req, res) {
  let client = new Client(req.body)
  client
    .register()
    .then(() => {
      res.json({
        clientName: client.data.clientName
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}
