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
    id: "",
    clientName: this.data.clientName.trim(),
    owner: this.data.owner.trim(),
    accountKey: this.data.accountKey,
    clientKey: this.data.clientKey,
    email: this.data.email.trim().toLowerCase(),
    contact: this.data.contact,
    address1: this.data.address1,
    address2: this.data.address2
  }
}

Client.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    if (!this.errors.length) {
      await clientsCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

Client.findAll = function () {
  // function insertID(mongoID) {
  //   return ObjectId(mongoID)
  // }

  return new Promise(function (resolve, reject) {
    clientsCollection
      .find()
      .toArray()
      .then(function (clients) {
        // MUI data grid requires each element/row to have an id property.
        // If the array elements have an id property, resolve with inital array.
        if (clients[0].id) {
          resolve(clients)
          // Otherwise, copy MongoDB _id to id property of each element/row.
        } else if (clients.length) {
          clients.forEach(client => {
            client.id = client._id
          })
          resolve(clients)
        } else {
          reject()
        }
      })
      .catch(function (e) {
        reject()
      })
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
