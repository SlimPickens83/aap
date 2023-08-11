import React, { useState, useEffect, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Axios from "axios"
import { useImmer, useImmerReducer } from "use-immer"
import StateContext from "../StateContext"
import DispatchContext from "../DispatchContext"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function Registration() {
  const appDispatch = useContext(DispatchContext)
  const navigate = useNavigate()

  const initialState = {
    username: {
      value: "",
      hasErrors: false,
      checkCount: 0
    },
    email: {
      value: "",
      hasErrors: false,
      checkCount: 0
    },
    password: {
      value: ""
    },
    clientKey: {
      value: ""
    },
    errors: {
      value: ""
    },
    submitCount: 0
  }

  function regReducer(draft, action) {
    switch (action.type) {
      case "username":
        draft.username.value = action.value
        return
      case "email":
        draft.email.value = action.value
        return
      case "password":
        draft.password.value = action.value
        return
      case "clientKey":
        draft.clientKey.value = action.value
        return
      case "submitForm":
        if (draft.username.value && draft.email.value && draft.password.value && draft.clientKey.value) {
          draft.submitCount++
        }
        return
      case "errors":
        draft.errors.value = action.value
        return
    }
  }

  const [state, dispatch] = useImmerReducer(regReducer, initialState)

  const clientAuth = async function () {
    try {
      const response = await Axios.post("/clientAuth", { clientKey: state.clientKey.value })
      appDispatch({ type: "clientAuth", data: response.data.clientName })
    } catch {
      dispatch({ type: "errors", value: "Undetermined client authentication error." })
    }
  }

  const register = async function () {
    try {
      const response = await Axios.post("/register", {
        username: state.username.value,
        email: state.email.value,
        password: state.password.value,
        clientKey: state.clientKey.value
      })
      appDispatch({ type: "login", data: response.data.user.data })
    } catch {
      dispatch({ type: "errors", value: "There was a problem or the request was canceled." })
    }
  }

  const redirectToDash = () => navigate("/dashboard")

  useEffect(() => {
    if (state.errors.value) {
      console.log(state.errors.value)
    }
  }, [state.errors])

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source()
      clientAuth()
        .then(register)
        .then(redirectToDash)
        .catch(() => dispatch({ type: "errors", value: "There was a problem." }))
      return () => ourRequest.cancel()
    }
  }, [state.submitCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "username", value: state.username.value })
    dispatch({ type: "email", value: state.email.value })
    dispatch({ type: "password", value: state.password.value })
    dispatch({ type: "clientKey", value: state.clientKey.value })
    dispatch({ type: "submitForm" })
  }

  return (
    <div id="registerContainer">
      <h1 className="text-primary">Registration</h1>
      <Link to="/clientRegistration" style={{ fontSize: 14, marginBottom: 24 }}>
        For client registration click here.
      </Link>
      <Form onSubmit={handleSubmit} id="register">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label style={{ fontSize: "14px" }}>Please create a username.</Form.Label>
          <Form.Control onChange={e => dispatch({ type: "username", value: e.target.value })} type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ fontSize: "14px" }}>Please enter a valid email address.</Form.Label>
          <Form.Control onChange={e => dispatch({ type: "email", value: e.target.value })} type="email" placeholder="Email" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ fontSize: "14px" }}>Please create a secure password.</Form.Label>
          <Form.Control onChange={e => dispatch({ type: "password", value: e.target.value })} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formClientKey">
          <Form.Label style={{ fontSize: "14px" }}>Please enter a valid client key</Form.Label>
          <Form.Control onChange={e => dispatch({ type: "clientKey", value: e.target.value })} type="password" placeholder="Client Key" />
        </Form.Group>

        <div className="alert alert-info" role="alert" style={{ width: 220 }}>
          For preview purposes, visitors can use "guest" as a Client Key. Registration will fail without one, also if password is less than eight characters or if email is not a valid email address. Finished site will dynamically display messages to user to notify them whether their proposed credentials are properly formatted.
        </div>

        <Button id="regSubmit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Registration
