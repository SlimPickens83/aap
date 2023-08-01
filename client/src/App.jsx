import React, { useState, useReducer, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./admin.css"
import Axios from "axios"
Axios.defaults.baseURL = process.env.REACT_APP_BACKENDURL || "https://aapbackend.onrender.com/"

import StateContext from "./StateContext.jsx"
import DispatchContext from "./DispatchContext.jsx"

// Components
import HeaderLoggedOut from "./components/HeaderLoggedOut.jsx"
import HeaderLoggedIn from "./components/HeaderLoggedIn.jsx"
import Footer from "./components/Footer.jsx"
import HomeGuest from "./components/HomeGuest.jsx"
import About from "./components/About.jsx"
import Contact from "./components/Contact.jsx"
import Freq from "./components/Freq.jsx"
import Login from "./components/Login.jsx"
import Registration from "./components/Registration.jsx"
import ClientRegistration from "./components/ClientRegistration.jsx"
import Portal from "./components/Portal.jsx"
import Commissions from "./components/Commissions.jsx"
import AdminLogin from "./components/AdminLogin.jsx"
import AdminDashboard from "./components/dashComponents/AdminDashboard.jsx"

// Dashboard Components
import Dashboard from "./scenes/dashboard/index"
import Team from "./scenes/team"
import Invoices from "./scenes/invoices"
import Contacts from "./scenes/contacts"
import Bar from "./scenes/bar"
import Form from "./scenes/form"
import Line from "./scenes/line"
import Pie from "./scenes/pie"
import FAQ from "./scenes/faq"
import Geography from "./scenes/geography"
import Calendar from "./scenes/calendar"

function App() {
  const initialState = {
    loggedIn: false,
    clientAuth: false,
    accountAuth: false,
    admin: false,
    dashboardRoute: true,
    user: {
      username: localStorage.getItem("aaUsername")
    },
    clientData: {
      clientName: localStorage.getItem("clientName")
    }
  }

  function mainReducer(draft, action) {
    switch (action.type) {
      case "adminAuthenticate":
        draft.admin = true
        return
      case "login":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "register":
        draft.loggedIn = true
        draft.user = action.data
        return
      case "clientAuth":
        draft.clientAuth = true
        draft.client = action.data
        return
      case "accountAuth":
        draft.clientAuth = true
        draft.accountAuth = true
        draft.client = action.data
        return
      case "dashboard":
        draft.dashboardRoute = false
    }
  }

  const [state, dispatch] = useImmerReducer(mainReducer, initialState)

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("aaUsername", state.user.username)
    } else {
      localStorage.removeItem("aaUsername")
    }
  }, [state.loggedIn])

  useEffect(() => {
    if (state.clientAuth) {
      localStorage.setItem("clientName", state.clientData.clientName)
    } else {
      localStorage.removeItem("clientName")
    }
  }, [state.clientAuth])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          {state.admin ? <></> : state.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
          <Routes>
            <Route path="/" element={state.loggedIn ? <Portal /> : <HomeGuest />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Freq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/clientRegistration" element={<ClientRegistration />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/commissions" element={<Commissions />} />
            <Route path="/admin_login" element={<AdminLogin />} />

            {/* Dashboard Routes */}
            <Route path="/adminDashboard/*" element={<AdminDashboard dashComponent={<Dashboard />} />} />
            <Route path="/adminDashboard/team" element={<AdminDashboard dashComponent={<Team />} />} />
            <Route path="/adminDashboard/contacts" element={<AdminDashboard dashComponent={<Contacts />} />} />
            <Route path="/adminDashboard/invoices" element={<AdminDashboard dashComponent={<Invoices />} />} />
            <Route path="/adminDashboard/form" element={<AdminDashboard dashComponent={<Form />} />} />
            <Route path="/adminDashboard/calendar" element={<AdminDashboard dashComponent={<Calendar />} />} />
            <Route path="/adminDashboard/faq" element={<AdminDashboard dashComponent={<FAQ />} />} />
            <Route path="/adminDashboard/bar" element={<AdminDashboard dashComponent={<Bar />} />} />
            <Route path="/adminDashboard/pie" element={<AdminDashboard dashComponent={<Pie />} />} />
            <Route path="/adminDashboard/line" element={<AdminDashboard dashComponent={<Line />} />} />
            <Route path="/adminDashboard/geography" element={<AdminDashboard dashComponent={<Geography />} />} />
          </Routes>
          {state.admin ? <></> : <Footer />}
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export default App
