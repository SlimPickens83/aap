import React, { useEffect, useContext } from "react"
import StateContext from "../StateContext"
import { useImmer } from "use-immer"
import Button from "react-bootstrap/Button"
import AdminDefault from "../components/AdminDefault"
import Jobs from "../components/Jobs"
import Fee from "../components/Fee"
import Invoice from "../components/Invoice"

function Admin() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    jobs: false,
    jobsCounter: 0,
    fee: false,
    feeCounter: 0,
    invoice: false,
    invoiceCounter: 0
  })

  function viewJobs() {
    setState(draft => {
      draft.jobsCounter++
      draft.jobs = true
    })
  }

  function clearJobs() {
    setState(draft => {
      draft.fee = false
      draft.invoice = false
    })
  }

  function viewFee() {
    setState(draft => {
      draft.feeCounter++
      draft.fee = true
    })
  }

  function clearFee() {
    setState(draft => {
      draft.jobs = false
      draft.invoice = false
    })
  }

  function viewInvoice() {
    setState(draft => {
      draft.invoiceCounter++
      draft.invoice = true
    })
  }

  function clearInvoice() {
    setState(draft => {
      draft.jobs = false
      draft.fee = false
    })
  }

  useEffect(() => {
    clearJobs()
  }, [state.jobsCounter])

  useEffect(() => {
    clearFee()
  }, [state.feeCounter])

  useEffect(() => {
    clearInvoice()
  }, [state.invoiceCounter])

  return (
    <div id="portalContainer">
      <div id="portalWelcomeContainer">
        <div id="welcome">Welcome, {`${appState.user.username}`}!</div>
      </div>
      <div id="portalMain">
        <div id="portalSidebar">
          <Button id="adminButton">Add New Client</Button>
          <Button id="adminButton">Add New Job</Button>
          <Button onClick={viewJobs} id="clientButton">
            Current Jobs
          </Button>
          <Button onClick={viewFee} id="clientButton">
            Fee Structure
          </Button>
          <Button onClick={viewInvoice} id="clientButton">
            Invoices
          </Button>
        </div>
        <div id="portalDisplay">{state.jobs ? <Jobs /> : state.fee ? <Fee /> : state.invoice ? <Invoice /> : <AdminDefault />}</div>
      </div>
    </div>
  )
}

export default Admin
