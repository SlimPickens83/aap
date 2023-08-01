import React, { useEffect } from "react"

function Jobs() {
  return (
    <div id="jobsMain">
      <div id="company">Company Name</div>
      <div id="jobsContainer">
        <div id="job">
          <div id="jobChild">Job 1</div>
          <div id="jobChild">type</div>
          <div id="jobChild">billed</div>
          <div id="jobChild">duration</div>
        </div>
        <div id="job">
          <div id="jobChild">Job 2</div>
          <div id="jobChild">type</div>
          <div id="jobChild">billed</div>
          <div id="jobChild">duration</div>
        </div>
        <div id="job">
          <div id="jobChild">Job 3</div>
          <div id="jobChild">type</div>
          <div id="jobChild">billed</div>
          <div id="jobChild">duration</div>
        </div>
      </div>
    </div>
  )
}

export default Jobs
