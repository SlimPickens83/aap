import React, { useEffect } from "react"

function AdminDefault() {
  return (
    <div id="adminDashboardContainer">
      <p id="adminDashHeader">Administrative Dashboard</p>
      <div id="adminDashTop">
        <div id="adminDashCard"></div>
        <div id="adminDashCard"></div>
        <div id="adminDashCard"></div>
        <div id="adminDashCard"></div>
      </div>
      <div id="adminDashMid">
        <div id="adminChart"></div>
        <div id="adminChart"></div>
      </div>
      <div id="adminDashBottom">
        <div id="adminDataTable"></div>
      </div>
    </div>
  )
}

export default AdminDefault
