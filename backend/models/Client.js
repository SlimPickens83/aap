const clientsCollection = require("../db").db().collection("clients")
const ObjectId = require("mongodb").ObjectId

// clientsCollection.createIndex({ clientName: "text", clientKey: "text" })

let Client = function (data) {
  this.data = data
  this.errors = []
}

Client.prototype.cleanUp = function () {
  if (typeof this.data.clientName != "string") {
    this.data.clientName = ""
  }

  if (typeof this.data.clientKey != "string") {
    this.data.clientKey = ""
  }

  if (typeof this.data.accountKey != "string") {
    this.data.accountKey = ""
  }

  this.data = {
    clientName: this.data.clientName.trim().toLowerCase(),
    clientKey: this.data.clientKey,
    accountKey: this.data.accountKey
  }
}

Client.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      await clientsCollection.insertOne(this.data)
      resolve()
    } else {
      f
      reject(this.errors)
    }
  })
}

Client.findByKey = function (key) {
  return new Promise(function (resolve, reject) {
    if (typeof key != "string") {
      reject()
      return
    }
    clientsCollection
      .findOne({ clientKey: key })
      .then(function (clientDoc) {
        if (clientDoc) {
          clientDoc = new Client(clientDoc, true)
          clientDoc = {
            id: clientDoc.data._id,
            clientName: clientDoc.data.clientName,
            clientKey: clientDoc.data.clientKey
          }
          resolve(clientDoc)
        } else {
          reject()
        }
      })
      .catch(function (e) {
        reject()
      })
  })
}

module.exports = Client
