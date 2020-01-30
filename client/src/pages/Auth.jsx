import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  loginOkay,
  registerOkay,
  loginFail
} from "../store/actions/authActions";
import { connect } from "react-redux";
import Login from "../components/Login";

import Register from "../components/Register";
import Loader from "../components/Loader";

const AuthPage = ({
  isAuth,
  loginOkay,
  hasRegistered,
  registerOkay,
  loading,
  loginFail
}) => {
  const [login, setLogin] = useState(true);
  const toggleAuth = () => {
    setLogin(!login);
  };
  useEffect(() => {
    if (window.location.search !== "" && !isAuth) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("jwt");
      if (token === "false") {
        console.log("oAuth account not active");
        loginFail("user account deactivated");
        return;
      }
      const { email, id, externalProvider } = jwt_decode(token);
      const userInfo = { email, id };
      console.log("from oauth ", token);
      if (externalProvider) {
        //if user has logged in from oauth and for the first time, enable quiz
        registerOkay();
      }
      loginOkay(userInfo, token);
    }
  }, [isAuth, loginFail, loginOkay, registerOkay]);
  if (isAuth) {
    return <Redirect to="/my" />;
  }

  return (
    <Container>
      {loading ? <Loader /> : null}
      {login ? (
        <Login loginOrRegister={login} toggle={toggleAuth} />
      ) : (
        <Register loginOrRegister={login} toggle={toggleAuth} />
      )}
    </Container>
  );
};
const mapDispatch = dispatch => ({
  loginOkay: (userInfo, token) => dispatch(loginOkay(userInfo, token)),
  registerOkay: () => dispatch(registerOkay()),
  loginFail: err => dispatch(loginFail(err))
});
const mapState = state => ({
  isAuth: state.auth.isAuth,
  hasRegistered: state.auth.hasRegistered,
  loading: state.auth.loading
});
export default connect(
  mapState,
  mapDispatch
)(AuthPage);

// <Button onClick={toggleAuth} style={{ marginTop: "2rem" }}>
//   {login ? "or Register" : "Login"}
// </Button>
