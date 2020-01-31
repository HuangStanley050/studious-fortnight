import React from "react";
import { Link } from "react-router-dom";
//import Logout from "../components/Logout";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Landing = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to="/my" />;
  }
  return (
    <>
      <h1>Landing page</h1>
      <Link to="/auth">Login/Register</Link>
      <br />
      <br />
    </>
  );
};
const mapState = state => ({
  isAuth: state.auth.isAuth
});
export default connect(mapState)(Landing);
