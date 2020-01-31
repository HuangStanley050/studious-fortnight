import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <NavLink className="link" to="/about" activeClassName="is-active">
        About us
      </NavLink>{" "}
      &nbsp;
      <NavLink className="link" to="/contact" activeClassName="is-active">
        Contact
      </NavLink>
    </div>
  );
};

export default Footer;
