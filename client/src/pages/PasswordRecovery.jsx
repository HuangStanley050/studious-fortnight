import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import API from "../api";
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

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(email);
    try {
      setLoading(true);
      let result = await axios.post(API.resetPassword, { email });
      setLoading(false);
      setSuccessMsg("Password reset link sent via email.");
      setEmail("");
      setError("");
      //console.log(result.data);
    } catch (err) {
      setEmail("");
      setError(err.response.data.msg);
      setLoading(false);
      console.log(err.response.data.msg);
    }
  };
  return (
    <Container style={{ marginTop: "1.5rem" }}>
      {loading ? <Loader /> : null}
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
            {error ? (
              <FormGroup>
                <Alert color="danger">{error}</Alert>
              </FormGroup>
            ) : null}
            {successMsg ? (
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

export default PasswordRecovery;
