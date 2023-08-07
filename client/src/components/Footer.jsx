import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import pitt from "../assets/pittSkyline.png"

function Footer() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <footer>
        <img className="city" src={pitt} alt="" />
        <div style={{ fontSize: 18 }}>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | <Link to="/admin_login">Admin</Link>
        </div>
        <div style={{ fontSize: 12 }}>
          Images via <a href="https://www.freepik.com/">Freepik</a> & <a href="https://www.unsplash.com">Unsplash</a>
        </div>
        <p className="m-0" style={{ fontSize: 12 }}>
          Copyright &copy; {new Date().getFullYear()}{" "}
          <a href="/" className="text-muted">
            AccountAbility Pittsburgh
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Footer
