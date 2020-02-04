import React from "react";
import { Link } from "react-router-dom";
//import Logout from "../components/Logout";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Landing.scss";

export const Landing = ({ isAuth }) => {
  if (isAuth) {
    return <Redirect to="/my" />;
  }
  return (
    <div className="landing-content">
      <h1>Your guide to metal clarity</h1>
      <p>Live a healthier, happier, more well-rested life with CMCFlow.</p>
      <Link className="login-register-button" to="/auth">Login or Register</Link>
      <div className="background-img"></div>
    </div>
  );
};
const mapState = state => ({
  isAuth: state.auth.isAuth
});
export default connect(mapState)(Landing);
