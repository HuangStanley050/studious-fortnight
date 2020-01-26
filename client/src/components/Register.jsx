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
  FormText,
  NavItem,
  NavLink,
  Row,
  Col,
  Container
} from "reactstrap";

const Register = ({ register, error, clearError, toggle, loginOrRegister }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const buttonStyle = {
    width: "40%",
    margin: "0 auto"
  };
  // clear error message when component unmounts
  useEffect(() => {
    return () => {
      console.log("component unmount");
      clearError();
    };
  }, [clearError]);

  const handleSubmit = e => {
    e.preventDefault();
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

            {error ? <div>{error}</div> : null}
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
  error: state.auth.error
});
export default connect(
  mapState,
  mapDispatch
)(Register);
