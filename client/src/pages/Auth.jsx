import React from "react";
import { Container } from "reactstrap";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = props => {
  return (
    <Container>
      <h1>Auth page</h1>
      <Login />
      {/*<Register />*/}
    </Container>
  );
};

export default AuthPage;
