const bcrypt = require("bcryptjs")
const usersCollection = require("../db").db().collection("users")
const validator = require("validator")

let User = function (data) {
  this.admin = false
  this.client = false
  this.employee = false
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  const userInput = ["username", "email", "password", "firstName", "lastName", "adminKey", "accountKey", "clientKey"]
  userInput.forEach(input => {
    if (typeof this.data.input != "string") {
      this.data.input = ""
    }
  })

  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
    firstName: this.data.firstName,
    lastName: this.data.lastName,
    adminKey: this.data.adminKey,
    accountKey: this.data.accountKey,
    clientKey: this.data.clientKey
  }
}

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("You must provide a username.")
    }
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {
      this.errors.push("Username can only contain letters and numbers.")
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("You must provide a valid email address.")
    }
    if (this.data.password == "") {
      this.errors.push("You must provide a password.")
    }
    if (this.data.password.length > 0 && this.data.password.length < 8) {
      this.errors.push("Password must be at least 8 characters.")
    }
    if (this.data.password.length > 50) {
      this.errors.push("Password cannot exceed 50 characters.")
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("Username must be at least 3 characters.")
    }
    if (this.data.username.length > 30) {
      this.errors.push("Username cannot exceed 30 characters.")
    }

    // Only if username is valid then check to see if it's already taken
    if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
      let usernameExists = await usersCollection.findOne({ username: this.data.username })
      if (usernameExists) {
        this.errors.push("That username is already taken.")
      }
    }

    // Only if email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({ email: this.data.email })
      if (emailExists) {
        this.errors.push("That email is already being used.")
      }
    }
    resolve()
  })
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    // this.cleanUp()
    usersCollection
      .findOne({ username: this.data.username })
      .then(async attemptedUser => {
        const passwordValidation = await bcrypt.compare(this.data.password, attemptedUser.password)
        console.log("attempted User in User.js, User.prototype.login:")
        console.log(attemptedUser)
        if (attemptedUser && passwordValidation) {
          this.data.username = attemptedUser.username
          this.loggedIn = true
          console.log("*This* in User.prototype.")
          resolve(this)
        } else {
          reject("Invalid username / password.")
        }
      })
      .catch(function (e) {
        reject("Please try again later.")
      })
  })
}

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // Validate user data.
    // this.cleanUp()
    console.log("PRE-VALIDATE")
    await this.validate()
    console.log("POST-VALIDATE")
    console.log(`this.errors in User.js, User.prototype.register: ${this.errors}`)
    // Hash user password and save user to database upon successful validation.
    if (!this.errors.length) {
      console.log(`Password before bcrypt: ${this.data.password}`)
      this.data.password = bcrypt.hashSync(this.data.password, 10)
      console.log(`Password after bcrypt: ${this.data.password}`)
      await usersCollection.insertOne(this.data)
      console.log("User registered successfully. " + this.data)
      resolve(this.data)
    } else {
      console.log(`Errors in User.js, User.prototype.register: ${this.errors}`)
      reject(this.errors)
    }
  })
}

User.prototype.adminLogin = function () {
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

module.exports = User
