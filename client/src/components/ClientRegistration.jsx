import React, { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import { useImmerReducer } from "use-immer"
import DispatchContext from "../DispatchContext"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function ClientRegistration() {
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
    accountKey: {
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
      case "accountKey":
        draft.accountKey.value = action.value
        return
      case "submitForm":
        if (draft.username.value && draft.email.value && draft.password.value && draft.accountKey.value) {
          draft.submitCount++
        }
        return
      case "errors":
        draft.errors.value = action.value
        return
    }
  }

  const [state, dispatch] = useImmerReducer(regReducer, initialState)

  const accountAuth = async function () {
    await Axios.post("/clientAuth", { accountKey: state.accountKey.value, type: "accountKey" })
      .then(() => appDispatch({ type: "accountAuth" }))
      .catch(() => dispatch({ type: "errors", value: "Undetermined account authentication error." }))
  }

  const register = async function () {
    try {
      const response = await Axios.post("/clientRegister", {
        username: state.username.value,
        email: state.email.value,
        password: state.password.value
      })
      appDispatch({ type: "register", data: response.data.user.data })
    } catch {
      dispatch({ type: "errors", value: "There was a problem or the request was canceled." })
    }
  }

  const redirectToRoot = () => navigate("/")

  useEffect(() => {
    if (state.errors.value) {
      console.log(state.errors.value)
    }
  }, [state.errors])

  useEffect(() => {
    if (state.submitCount) {
      const ourRequest = Axios.CancelToken.source()
      accountAuth()
        .then(register)
        .then(redirectToRoot)
        .catch(() => dispatch({ type: "errors", value: "There was a problem" }))
    }
  }, [state.submitCount])

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: "username", value: state.username.value })
    dispatch({ type: "email", value: state.email.value })
    dispatch({ type: "password", value: state.password.value })
    dispatch({ type: "accountKey", value: state.accountKey.value })
    dispatch({ type: "submitForm" })
  }

  return (
    <div id="registerContainer">
      <h1 className="text-primary">Client Registration</h1>
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

        <Form.Group className="mb-3" controlId="formAccountKey">
          <Form.Label style={{ fontSize: "14px" }}>Please enter a valid account key</Form.Label>
          <Form.Control onChange={e => dispatch({ type: "accountKey", value: e.target.value })} type="password" placeholder="Account Key" />
        </Form.Group>

        <div className="alert alert-info" role="alert" style={{ width: 220 }}>
          For preview purposes, visitors can use "guest" as an account key. Registration will fail without one, also if password is less than eight characters or if email is not a valid email address. Finished site will dynamically display messages to user to notify them whether their proposed credentials are properly formatted.
        </div>

        <Button id="regSubmit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default ClientRegistration
