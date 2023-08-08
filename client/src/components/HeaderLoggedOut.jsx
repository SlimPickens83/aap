import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import logo from "../assets/aa-p_mk2.png"

function HeaderLoggedOut() {
  return (
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
            <Link to="/faq" id="headerGrandchild" className="nav-link active">
              FAQ
            </Link>
            <Link to="/about" id="headerGrandchild" className="nav-link active">
              About
            </Link>
            <div id="navdropdownContainer">
              <NavDropdown className="btn-primary" title="Client Portal" id="basic-nav-dropdown">
                <Link to="/login" className="nav-link dropdown-item">
                  Sign In
                </Link>
                <Link to="/registration" className="nav-link dropdown-item">
                  Register
                </Link>
                <NavDropdown.Divider />
                <Link to="/commissions" className="nav-link dropdown-item">
                  CommissionsPro
                </Link>
              </NavDropdown>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderLoggedOut
