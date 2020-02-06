import React from "react";

import { Field, reduxForm, getFormValues } from "redux-form";
import { connect } from "react-redux";
import { Col, Container, Button } from "reactstrap";

export let PageThree = ({ prevPage, nextPage, values }) => {
  //const { prevPage, nextPage } = props;
  const selectionStyle = {
    boxShadow: "0 0 5px 5px #2ecc71"
  };
  let selection;
  const fiveMin = "5";
  const tenMin = "10";
  const sixtyMin = "60";
  if (values) {
    selection = values.duration;
  }
  return (
    <Container>
      <h2 data-testid="MeditationHour" style={{ textAlign: "center" }}>Preferred Meditation Time</h2>
      <form className="row" onSubmit={nextPage}>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="duration"
              component="input"
              type="radio"
              value="5"
            />
            <div
              className="card card-input"
              style={selection === fiveMin ? selectionStyle : null}
            >
              <div className="card-body">
                <div className="card-title">5 Mins</div>
              </div>
            </div>
          </label>
        </Col>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="duration"
              component="input"
              type="radio"
              value="10"
            />
            <div
              className="card card-input"
              style={selection === tenMin ? selectionStyle : null}
            >
              <div className="card-body">
                <div className="card-title">10 Mins</div>
              </div>
            </div>
          </label>
        </Col>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="duration"
              component="input"
              type="radio"
              value="60"
            />
            <div
              className="card card-input"
              style={selection === sixtyMin ? selectionStyle : null}
            >
              <div className="card-body">
                <div className="card-title">60 Mins</div>
              </div>
            </div>
          </label>
        </Col>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%"
          }}
        >
          <Button
            type="button"
            color="info"
            className="cancel-button"
            onClick={prevPage}
          >
            Previous
          </Button>
          <Button
            type="button"
            color="primary"
            className="confirm-button"
            onClick={nextPage}
          >
            Next
          </Button>
        </div>
      </form>
    </Container>
  );
};
PageThree = connect(state => ({
  values: getFormValues("quiz")(state)
}))(PageThree);
export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageThree);
