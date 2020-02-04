import React, { useState, useEffect } from "react";
//import { withRouter } from "react-router-dom";
import { register, clearError } from "../store/actions/authActions";
import registerStyle from "./Register.module.css";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Row,
  Col,
  Container
} from "reactstrap";

export const Register = ({
  register,
  error,
  clearError,
  toggle,
  loginOrRegister,
  hasRegistered,
  isAuth
}) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const [successMsg, setSuccessMsg] = useState(
    "Registration Successful, Please Login."
  );
  const warnBeforeLeave = e => "are you sure you want to leave?";

  useEffect(() => {
    window.onbeforeunload = warnBeforeLeave;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const buttonStyle = {
    width: "40%",
    margin: "0 auto"
  };
  // clear error message when component unmounts
  useEffect(() => {
    return () => {
      console.log("component unmounts from register");

      clearError();
    };
  }, [clearError, hasRegistered, isAuth]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!userInfo.email || !userInfo.password || !userInfo.passwordConfirm) {
      alert("Unable to registerg due to missing fields");
      return;
    }
    register({ email: userInfo.email, password: userInfo.password });

    setUserInfo({
      ...userInfo,
      email: "",
      password: "",
      passwordConfirm: ""
    });
  };
  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Container style={{ marginTop: "1.5rem" }}>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h3>Register</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="your email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={userInfo.password}
                id="password"
                onChange={handleChange}
                placeholder="your password"
              />
            </FormGroup>

            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="passwordConfirm"
                value={userInfo.passwordConfirm}
                id="passwordConfirm"
                onChange={handleChange}
                placeholder="confirm password"
              />
            </FormGroup>
            <FormGroup style={buttonStyle}>
              <Button className={registerStyle.btn}>Sign Up</Button>
            </FormGroup>
            <FormGroup style={buttonStyle}>
              <Button
                color="warning"
                style={{ width: "100%", color: "white" }}
                onClick={toggle}
              >
                {loginOrRegister ? "or Register" : "Login"}
              </Button>
            </FormGroup>

            {error ? (
              <div style={{ marginTop: "1rem" }}>
                <Alert color="danger">{error}</Alert>
              </div>
            ) : null}
            {hasRegistered ? (
              <div style={{ marginTop: "1rem" }}>
                <Alert color="success">{successMsg}</Alert>
              </div>
            ) : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const mapDispatch = dispatch => ({
  register: userInfo => dispatch(register(userInfo)),
  clearError: () => dispatch(clearError())
});
const mapState = state => ({
  error: state.auth.error,
  isAuth: state.auth.isAuth,
  hasRegistered: state.auth.hasRegistered
});
export default connect(
  mapState,
  mapDispatch
)(Register);
