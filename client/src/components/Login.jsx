import React, { useState, useEffect } from "react";
import { login } from "../store/actions/authActions";
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

const Login = ({ login, error }) => {
  const [form, handleChange, resetFields] = useForm();
  const handleSubmit = e => {
    e.preventDefault();
    login(form);
    resetFields();
  };
  return (
    <Container>
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

        <NavLink href="/api/auth/facebook">Login with Facebook</NavLink>

        <NavLink href="/api/auth/google">Login with Google</NavLink>

        <Button>Submit</Button>
        {error ? <div>{error}</div> : null}
      </Form>
    </Container>
  );
};
const mapDispatch = dispatch => ({
  login: userInfo => dispatch(login(userInfo))
});
const mapState = state => ({
  error: state.auth.error
});
export default connect(
  mapState,
  mapDispatch
)(Login);
