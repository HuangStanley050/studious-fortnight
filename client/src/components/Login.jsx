import React, { useState, useEffect } from "react";
import { login } from "../store/actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearError } from "../store/actions/authActions";
import loginStyle from "./Login.module.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Row,
  Col,
  Container
} from "reactstrap";

const useForm = () => {
  const [form, setValue] = useState({
    email: "",
    password: ""
  });
  const handleChange = e => {
    setValue({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const resetFields = () => {
    setValue({
      ...form,
      email: "",
      password: ""
    });
  };

  return [form, handleChange, resetFields];
};

const Login = ({ login, error, clearError, toggle, loginOrRegister }) => {
  const [form, handleChange, resetFields] = useForm();
  const buttonStyle = {
    width: "40%",
    margin: "0 auto"
  };
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);
  const handleSubmit = e => {
    e.preventDefault();
    login(form);
    resetFields();
  };
  return (
    <Container style={{ marginTop: "1.5rem" }}>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h3>Login</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                value={form.email}
                onChange={handleChange}
                placeholder="your email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                value={form.password}
                id="examplePassword"
                onChange={handleChange}
                placeholder="your password"
              />
            </FormGroup>
            <FormGroup style={buttonStyle}>
              <Button className={loginStyle.btn}>Login</Button>
            </FormGroup>
            <FormGroup style={buttonStyle}>
              <NavLink
                style={{ textAlign: "center" }}
                className={`${loginStyle.fb} ${loginStyle.btn}`}
                href="/api/auth/facebook"
              >
                <i className="fab fa-facebook"></i> Login with Facebook
              </NavLink>
            </FormGroup>

            <FormGroup style={buttonStyle}>
              <NavLink
                style={{ textAlign: "center" }}
                className={`${loginStyle.google} ${loginStyle.btn}`}
                href="/api/auth/google"
              >
                <i className="fab fa-google"></i> Login with Google
              </NavLink>
            </FormGroup>
            <FormGroup style={buttonStyle}>
              <Button style={{ width: "100%" }} color="info" onClick={toggle}>
                {loginOrRegister ? "or Register" : "Login"}
              </Button>
            </FormGroup>
            <FormGroup style={buttonStyle}>
              <NavLink
                to="/password_recovery"
                style={{ width: "100%", textAlign: "center" }}
                tag={Link}
                onClick={toggle}
              >
                Forgot password?
              </NavLink>
            </FormGroup>

            {error ? <div>{error}</div> : null}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
const mapDispatch = dispatch => ({
  login: userInfo => dispatch(login(userInfo)),
  clearError: () => dispatch(clearError())
});
const mapState = state => ({
  error: state.auth.error
});
export default connect(
  mapState,
  mapDispatch
)(Login);
