import React, { useEffect, useState, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import Axios from "axios"
import DispatchContext from "../DispatchContext"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

function clientLogin(props) {
  const appDispatch = useContext(DispatchContext)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await Axios.post("/login", { username, password })
      if (response.data) {
        appDispatch({ type: "login", data: response.data })
        navigate("/")
      } else {
        console.log(`Incorrect username (${username}) / password (${password})`)
      }
    } catch (e) {
      console.log("Undetermined login error.")
    }
  }

  return (
    <div id="loginContainer">
      <h1 className="text-primary">Client Login</h1>
      <Form onSubmit={handleSubmit} id="login">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
        </Form.Group>

        <div className="alert alert-info" role="alert" style={{ width: 220 }}>
          For preview purporses, visitors can login with "guest" / "guest123 / "guest" or visit the registration page.
        </div>

        <Button id="loginSubmit" variant="primary" type="submit">
          Submit
        </Button>
        <Link to="/admin_login" style={{ fontSize: 12 }}>
          Login as Admin
        </Link>
      </Form>
    </div>
  )
}

export default ClientLogin
