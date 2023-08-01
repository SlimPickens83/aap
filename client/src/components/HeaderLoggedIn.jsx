import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import logo from "../assets/aa-p_mk2.png"

function HeaderLoggedIn() {
  return (
    <div style={{ marginLeft: "20%", marginRight: "20%" }}>
      <Navbar id="header" expand="lg" data-bs-theme="light">
        <div className="alert construction alert-warning">Under construction.</div>
        <Container id="headerContainer">
          <div id="headerChild">
            <Link to="/" className="navbar-brand">
              <img id="logo" src={logo} />
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" id="headerButton" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/faq" id="headerGrandchild">
                FAQ
              </Nav.Link>
              <Nav.Link href="/about" id="headerGrandchild">
                About
              </Nav.Link>
              <NavDropdown className="btn-primary" title="Client Portal" id="basic-nav-dropdown">
                <NavDropdown.Item href="/">Logout</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/commissions">CommissionsPro</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default HeaderLoggedIn
