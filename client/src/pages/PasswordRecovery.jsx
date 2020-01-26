import React, { useState } from "react";
import axios from "axios";
import API from "../api";
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

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(email);
    let result = await axios.post(API.resetPassword, { email });
    setEmail("");
    console.log(result.data);
  };
  return (
    <Container style={{ marginTop: "1.5rem" }}>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h3>Password Recovery form</h3>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input value={email} onChange={handleChange} type="email" />
            </FormGroup>
            <FormGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button style={{ margin: "0 auto" }} type="submit">
                Submit
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordRecovery;
