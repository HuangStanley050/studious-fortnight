import React from "react";
import renderField from "./renderField";
import { Field, reduxForm, getFormValues } from "redux-form";
import { Col, Container } from "reactstrap";
import { connect } from "react-redux";

let PageOne = ({ nextPage, values }) => {
  const selectionStyle = {
    boxShadow: "0 0 5px 5px #2ecc71"
  };
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
      <h2 style={{ textAlign: "center" }}>how much exp do you have?</h2>
      <form className="row" onSubmit={nextPage}>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="experience"
              type="radio"
              component={renderField}
              value="No experience"
            />{" "}
            <div
              className="card card-input"
              style={selection === noExperience ? selectionStyle : null}
            >
              <div className="card-body">
                <div className="card-title">No experience</div>
                <div className="card-body">No experience</div>
              </div>
            </div>
          </label>
        </Col>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="experience"
              type="radio"
              component={renderField}
              value="Some experience"
            />{" "}
            <div
              className="card card-input"
              style={selection === someExperience ? selectionStyle : null}
            >
              <div className="card-body">
                <div className="card-title">Some experience</div>
                <div className="card-body">Some experience</div>
              </div>
            </div>
          </label>
        </Col>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="experience"
              type="radio"
              component={renderField}
              value="Expert experience"
            />{" "}
            <div
              className="card card-input "
              style={selection === expertExperience ? selectionStyle : null}
            >
              <div className="card-body">
                <div className="card-title">Expert experience</div>
                <div className="card-body">Expoert experience</div>
              </div>
            </div>
          </label>
        </Col>
        <div>
          <button type="submit" className="next">
            Next
          </button>
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
