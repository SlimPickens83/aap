const adminCollection = require("../db").db().collection("admin")

let Admin = function (data) {
  this.authentic = true
  this.data = data
  this.errors = []
}

Admin.prototype.cleanUp = function () {
  if (typeof this.data.adminKey != "string") {
    this.data.adminKey = ""
  }

  this.data = {
    adminKey: this.data.adminKey
  }
}

Admin.prototype.authenticate = function () {
  return new Promise((resolve, reject) => {
    adminCollection
      .findOne({ adminKey: this.data.adminKey })
      .then(attemptedAdmin => {
        if (this.data.adminKey === attemptedAdmin.adminKey) {
          this.admin = true
          resolve("Admin login authenticated.")
        } else {
          reject("Invalid admin credentials.")
        }
      })
      .catch(function (e) {
        reject("Unknown error.")
      })
  })
}

module.exports = Admin
