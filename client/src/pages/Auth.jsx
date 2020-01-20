import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { loginOkay } from "../store/actions/authActions";
import { connect } from "react-redux";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = ({ isAuth, loginOkay }) => {
  useEffect(() => {
    if (window.location.search !== "" && !isAuth) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("jwt");
      const { email, id } = jwt_decode(token);
      const userInfo = { email, id };
      loginOkay(userInfo);
    }
  }, [isAuth, loginOkay]);
  if (isAuth) {
    return <Redirect to="/discover" />;
  }
  return (
    <Container>
      <h1>Auth page</h1>
      <Login />
      {/*<Register />*/}
    </Container>
  );
};
const mapDispatch = dispatch => ({
  loginOkay: userInfo => dispatch(loginOkay(userInfo))
});
const mapState = state => ({
  isAuth: state.auth.isAuth
});
export default connect(
  mapState,
  mapDispatch
)(AuthPage);
