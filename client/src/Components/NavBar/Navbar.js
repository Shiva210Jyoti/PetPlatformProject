import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Navbar = (props) => {
  return (
    <div className="navbar-container">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="Pet's Paradise Logo" />
          <p>{props.title}</p>
        </Link>
      </div>
      <div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/info">Pet Care</Link>
          </li>
          <li>
            <Link to="/pets">Pets</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            |
          </li>
          <li>
            <Link to="/admin">Admin Login</Link>
          </li>
        </ul>
      </div>
      <div>
        <Link to="/services">
          <button className="Navbar-button"> give for adoption </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
