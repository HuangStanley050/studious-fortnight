import React, { useState } from "react";
//import { withRouter } from "react-router-dom";
import { register } from "../store/actions/authActions";
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

const Register = ({ register }) => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleSubmit = e => {
    e.preventDefault();
    register({ email: userInfo.email, password: userInfo.password });
  };
  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };
  return (
    <Container>
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

        <Button>Submit</Button>
      </Form>
    </Container>
  );
};

const mapDispatch = dispatch => ({
  register: userInfo => dispatch(register(userInfo))
});
export default connect(
  null,
  mapDispatch
)(Register);
