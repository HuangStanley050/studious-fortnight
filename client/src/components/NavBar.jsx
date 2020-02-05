import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import "./NavBar.css";
import LOGO from "../assets/Logo1.png"


export const NavBar = ({ isAuth }) => {
  return (
    <div className="nav-container">
      <div className="nested-nav-container">
        <NavLink
          className="logo-text"
          to="/"
          activeClassName="is-active"
          exact={true}
        >
          <img src={LOGO} className="logo" />
        </NavLink>

        <div className="links">
          {isAuth ? (
            <NavLink
              className="link"
              to="/my/"
              activeClassName="is-active"
              exact={true}
            >
              HOME
            </NavLink>
          ) : null}
          {isAuth ? (
            <NavLink
              className="link"
              to="/my/discover"
              activeClassName="is-active"
              exact={true}
            >
              DISCOVER
            </NavLink>
          ) : null}
          {isAuth ? (
            <NavLink
              className="link"
              to="/my/profile/stats"
              activeClassName="is-active"
              exact={true}
            >
              PROFILE
            </NavLink>
          ) : null}
          {isAuth ? null : (
            <NavLink
              data-testid="NavbarLogin"
              className="link"
              to="/auth"
              activeClassName="is-active"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
const mapState = state => ({
  isAuth: state.auth.isAuth
});
export default connect(mapState)(NavBar);
