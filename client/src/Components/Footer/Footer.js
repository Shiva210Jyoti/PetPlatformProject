import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";

const Footer = (props) => {
  return (
    <footer className="footer">
      <div>
        <Link className="logo-container" to="/">
          <img className="navbar-logo" src={logo} alt="Pet's Paradise Logo" />
          <p>{props.title}</p>
        </Link>
      </div>
      <div className="below-footer">
        <p>
          You can reach me at{" "}
          <a className="mail-links" href="mailto:kashifkzmi5@gmail.com">
            somyasinghmalik@gmail.com
          </a>
        </p>
        <p>
          <a
            className="contact-links"
            href="https://www.linkedin.com/in/somya-malik-671458171/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-linkedin-square"></i> Linkedin
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            className="contact-links"
            href="https://github.com/somyasinghmalik"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-github"></i> GitHub
          </a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <a
            className="contact-links"
            href="https://www.instagram.com/somyasinghmalik/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-instagram"></i> Instagram
          </a>
          
        </p>
        <p>&copy; 2025 Mern stack project</p>
      </div>
    </footer>
  );
};

export default Footer;
