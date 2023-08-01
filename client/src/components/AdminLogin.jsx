import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [adminKey, setAdminKey] = useState()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await Axios.post("/adminLogin", { adminKey })
      if (response.data) {
        appDispatch({ type: "adminAuthenticate", data: response.data })
        try {
          const loginResponse = await Axios.post("/login", { username, password })
          if (loginResponse.data) {
            appDispatch({ type: "login", data: loginResponse.data })
            navigate("/adminDashboard")
          } else {
            console.log(`Incorrect username (${username}) / password (${password})`)
          }
        } catch {
          console.log("Undetermined login error.")
        }
      } else {
        console.log("Admin access denied.")
      }
    } catch (e) {
      console.log("Undetermined authentication error.")
    }
  }

  return (
    <div id="loginContainer">
      <h1 className="text-primary">Admin Login</h1>
      <Form onSubmit={handleSubmit} id="login">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Admin Key</Form.Label>
          <Form.Control onChange={e => setAdminKey(e.target.value)} type="password" placeholder="Admin Key" />
        </Form.Group>

        <div className="alert alert-info" role="alert" style={{ width: 216 }}>
          For preview purposes, visitors can use "guest" as the Admin Key and "guest"/"guest123" for Username/Password.
        </div>

        <Button id="loginSubmit" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login
