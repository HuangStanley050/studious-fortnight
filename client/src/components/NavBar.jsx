import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="nav-container">
      <div className="nested-nav-container">
        <NavLink className="logo-text" to="/" activeClassName="is-active" exact={true}>
          CMCflow
        </NavLink>

        <div className="links">
          <NavLink className="link" to="/my/" activeClassName="is-active" exact={true}>
            HOME
          </NavLink>
          <NavLink className="link" to="/my/discover" activeClassName="is-active" exact={true}>
            DISCOVER
          </NavLink>
          <NavLink className="link" to="/my/profile/stats" activeClassName="is-active" exact={true}>
            PROFILE
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
