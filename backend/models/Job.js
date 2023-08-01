const jobsCollection = require("../db").db().collection("jobs")
const ObjectId = require("mongodb").ObjectId

jobsCollection.createIndex({ number: 0, start: "date", end: "date", type: "text", billed: 0, client: "" })

let Job = function (data, userId, requestedJobId) {
  this.data = data
  this.userId = userId
  this.requestedJobId = requestedJobId
}

Job.prototype.cleanUp = function () {
  if (typeof this.data.number != "number") {
    this.data.number = 0
  }

  if (typeof this.data.start != "string") {
    this.data.start = ""
  }

  if (typeof this.data.end != "string") {
    this.data.end = ""
  }

  if (typeof this.data.type != "string") {
    this.data.type = ""
  }

  if (typeof this.data.billed != "number") {
    this.data.billed = 0
  }

  this.data = {
    number: this.data.number,
    start: new Date(),
    end: this.data.end,
    type: this.data.type,
    billed: this.data.billed,
    client: ObjectId(this.userId)
  }
}

Job.prototype.create = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    jobsCollection
      .insertOne(this.data)
      .then(info => {
        resolve(info.insertedId)
      })
      .catch(e => {
        reject(console.log("Error creating job."))
      })
  })
}

Job.prototype.update = function () {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    await jobsCollection.findOneAndUpdate({ _id: new ObjectId(this.requestedJobId) }, { $set: { number: this.data.number, end: this.data.end, type: this.data.type, billed: this.data.billed } })
    resolve("success")
  })
}

Job.reusableJobQuery = function (uniqueOperations, finalOperations = []) {
  return new Promise(async function (resolve, reject) {
    let aggOperations = uniqueOperations
      .concat([
        { $lookup: { from: "jobs", localField: "client", foreignField: "_id", as: "clientDocument" } },
        {
          $project: {
            number: 1,
            start: 1,
            end: 1,
            type: 1,
            billed: 1,
            clientId: "$client",
            client: { $arrayElemAt: ["$clientDocument", 0] }
          }
        }
      ])
      .concat(finalOperations)

    let jobs = await jobsCollection.aggregate(aggOperations).toArray()

    resolve(jobs)
  })
}

Job.findSingleById = function (id) {
  return new Promise(async function (resolve, reject) {
    if (typeof id != "string" || !ObjectId.isValid(id)) {
      reject()
      return
    }

    let job = await Job.reusableJobQuery([{ $match: { _id: new ObjectId(id) } }])

    if (job.length) {
      resolve(job[0])
    } else {
      reject()
    }
  })
}

Job.findByClientId = function (clientId) {
  return Job.reusableJobQuery([{ $match: { client: clientId } }, { $sort: { start: -1 } }])
}

Job.delete = function (jobIdToDelete) {
  return new Promise(async (resolve, reject) => {
    try {
      let job = await Job.findSingleById(jobIdToDelete)
      await jobsCollection.deleteOne({ _id: new ObjectId(postIdToDelete) })
      resolve()
    } catch (e) {
      reject()
    }
  })
}

Job.getJoblist = async function (id) {
  let jobs = await jobsCollection.find({ clientId: new ObjectId(id) }).toArray()

  return Job.reusableJobQuery([{ $match: { client: { $in: jobs } } }, { $sort: { start: -1 } }])
}

module.exports = Job
