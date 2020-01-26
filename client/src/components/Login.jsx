import React, { useState, useEffect } from "react";
import { login } from "../store/actions/authActions";
import { connect } from "react-redux";
import { clearError } from "../store/actions/authActions";
import loginStyle from "./Login.module.css";
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

const Login = ({ login, error, clearError }) => {
  const [form, handleChange, resetFields] = useForm();
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
    <Container>
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
            <FormGroup>
              <Button className={loginStyle.btn}>Submit</Button>
            </FormGroup>
            <FormGroup>
              <NavLink
                className={`${loginStyle.fb} ${loginStyle.btn}`}
                href="/api/auth/facebook"
              >
                <i class="fab fa-facebook"></i> Login with Facebook
              </NavLink>
            </FormGroup>

            <FormGroup>
              <NavLink
                className={`${loginStyle.google} ${loginStyle.btn}`}
                href="/api/auth/google"
              >
                <i class="fab fa-google"></i> Login with Google
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
