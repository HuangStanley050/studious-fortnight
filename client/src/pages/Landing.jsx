import React from "react";
import { Link } from "react-router-dom";
//import Logout from "../components/Logout";

const Landing = () => {
  return (
    <>
      <h1>Landing page</h1>
      <Link to="/auth">Login/Register</Link>
      <br />
      <br />
    </>
  );
};

export default Landing;
