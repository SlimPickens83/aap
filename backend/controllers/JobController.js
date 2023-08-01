const client = require("../db")
const Job = require("../models/Job")

exports.create = function (req, res) {
  let job = new Job(req.body)
  client.create().then(() => {
    res.json({
      number: job.data.number,
      start: job.data.start,
      end: job.data.end,
      type: job.data.type,
      billed: job.data.billed,
      owner: job.data.owner
    })
  })
}

exports.update = function (req, res) {
  let post = new Job(req.body)
  post
    .update()
    .then(status => {
      // the post was successfully updated in the database
      // or user did have permission, but there were validation errors
      if (status == "success") {
        res.json("success")
      } else {
        res.json("failure")
      }
    })
    .catch(e => {
      // a post with the requested id doesn't exist
      // or if the current visitor is not the owner of the requested post
      res.json("no permissions")
    })
}

exports.request = function (req, res) {
  console.log("Feature pending.")
}
