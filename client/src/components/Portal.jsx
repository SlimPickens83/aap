import React, { useEffect, useReducer, useContext } from "react"
import Page from "./Page"
import { useParams, NavLink, Routes, Route } from "react-router-dom"
import StateContext from "../StateContext"
import { useImmer, useImmerReducer } from "use-immer"
import Button from "react-bootstrap/Button"
import ClientDefault from "./ClientDefault"
import Jobs from "./Jobs"
import Fee from "./Fee"
import Invoice from "./Invoice"
import DispatchContext from "../DispatchContext"

function Portal() {
  const appState = useContext(StateContext)
  const [state, setState] = useImmer({
    jobs: false,
    jobCounter: 0,
    clients: false,
    clientCounter: 0,
    fee: false,
    feeCounter: 0,
    invoice: false,
    invoiceCounter: 0
  })

  function viewJobs() {
    setState(draft => {
      draft.jobCounter++
      draft.jobs = true
    })
  }

  function clearJobs() {
    setState(draft => {
      draft.clients = false
      draft.fee = false
      draft.invoice = false
    })
  }

  function viewClients() {
    setState(draft => {
      draft.clientCounter++
      draft.client = true
    })
  }

  function clearClients() {
    setState(draft => {
      draft.jobs = false
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
      draft.clients = false
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
      draft.clients = false
      draft.fee = false
    })
  }

  useEffect(() => {
    clearJobs()
  }, [state.jobsCounter])

  useEffect(() => {
    clearClients()
  }, [state.clientCounter])

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
          {appState.admin && <Button id="adminButton">Add New Client</Button>}
          {appState.admin && <Button id="adminButton">Add New Job</Button>}
          <Button onClick={viewJobs} id="currentJobs">
            Current Jobs
          </Button>
          {appState.admin && (
            <Button onClick={viewClients} id="activeClients">
              Active Clients
            </Button>
          )}
          <Button onClick={viewFee} id="feeStructure">
            Fee Structure
          </Button>
          <Button onClick={viewInvoice} id="dynamicInvoice">
            Invoices
          </Button>
        </div>
        <div id="portalDisplay">{state.jobs ? <Jobs /> : state.fee ? <Fee /> : state.invoice ? <Invoice /> : <ClientDefault />}</div>
      </div>
    </div>
  )
}

export default Portal
