import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <NavLink to="/" activeClassName="is-active" exact={true}>
        LOGO
      </NavLink>{" "}
      &nbsp;
      <NavLink to="/" activeClassName="is-active" exact={true}>
        HOME
      </NavLink>{" "}
      &nbsp;
      <NavLink to="/discover" activeClassName="is-active" exact={true}>
        DISCOVER
      </NavLink>{" "}
      &nbsp;
      <NavLink to="/auth">Login/Register</NavLink>{" "}
      <NavLink to="/profile/stats" activeClassName="is-active" exact={true}>
        PROFILE
      </NavLink>{" "}
      &nbsp;
    </>
  );
};

export default NavBar;
