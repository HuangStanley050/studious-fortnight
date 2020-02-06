import React from "react";
import renderField from "./renderField";
import { Field, reduxForm, getFormValues } from "redux-form";
import { Col, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import beginner from "../assets/noExperience.jpg";
import intermediate from "../assets/someExperience.png";
import expert from "../assets/expertExperience.jpg";

export let PageOne = ({ nextPage, values }) => {
  const selectionStyle = {
    boxShadow: "0 0 5px 5px #2ecc71"
  };
  const required = value => (value ? undefined : "Required");
  let selection;
  const noExperience = "No experience";
  const someExperience = "Some experience";
  const expertExperience = "Expert experience";
  if (values) {
    selection = values.experience;
  }
  //console.log(selection);
  return (
    <Container>
      <h2 data-testid="MeditationExperience" style={{ textAlign: "center" }}>How much experience do you have?</h2>
      <form className="row" onSubmit={nextPage}>
        <Col lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="experience"
              type="radio"
              component={renderField}
              value="No experience"
              validate={required}
            />{" "}
            <div
              className="card card-input"
              style={selection === noExperience ? selectionStyle : null}
            >
              <div className="card-body mx-auto">
                <img
                  alt="beginner meditation"
                  style={{ width: "100%", height: "259px" }}
                  className="card-image-top "
                  src={beginner}
                />
                <div className="card-title">
                  <h3 style={{ textAlign: "center" }}>No experience</h3>
                </div>
              </div>
            </div>
          </label>
        </Col>
        <Col lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="experience"
              type="radio"
              component={renderField}
              value="Some experience"
              validate={required}
            />{" "}
            <div
              className="card card-input"
              style={selection === someExperience ? selectionStyle : null}
            >
              <div className="card-body mx-auto">
                <img
                  alt="intermediate meditation"
                  style={{ width: "100%", height: "259px" }}
                  className="card-image-top "
                  src={intermediate}
                />
                <div className="card-title">
                  <h3 style={{ textAlign: "center" }}>Expert experience</h3>
                </div>
              </div>
            </div>
          </label>
        </Col>
        <Col lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="experience"
              type="radio"
              component={renderField}
              value="Expert experience"
              validate={required}
            />{" "}
            <div
              className="card card-input "
              style={selection === expertExperience ? selectionStyle : null}
            >
              <div className="card-body mx-auto">
                <img
                  alt="expert meditation"
                  style={{ width: "100%", height: "259px" }}
                  className="card-image-top "
                  src={expert}
                />
                <div className="card-title">
                  <h3 style={{ textAlign: "center" }}>Expert experience</h3>
                </div>
              </div>
            </div>
          </label>
        </Col>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button className="confirm-button" color="primary" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Container>
  );
};
PageOne = connect(state => ({
  values: getFormValues("quiz")(state)
}))(PageOne);
export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageOne);
