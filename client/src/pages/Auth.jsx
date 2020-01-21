import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { loginOkay } from "../store/actions/authActions";
import { connect } from "react-redux";
import Login from "../components/Login";
import { Button } from "reactstrap";

import Register from "../components/Register";

const AuthPage = ({ isAuth, loginOkay, hasRegistered }) => {
  const [login, setLogin] = useState(true);
  const toggleAuth = () => {
    setLogin(!login);
  };
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
      {login ? <Login /> : <Register />}
      <Button onClick={toggleAuth} style={{ marginTop: "2rem" }}>
        {login ? "or Register" : "Login"}
      </Button>
    </Container>
  );
};
const mapDispatch = dispatch => ({
  loginOkay: userInfo => dispatch(loginOkay(userInfo))
});
const mapState = state => ({
  isAuth: state.auth.isAuth,
  hasRegistered: state.auth.hasRegistered
});
export default connect(
  mapState,
  mapDispatch
)(AuthPage);
