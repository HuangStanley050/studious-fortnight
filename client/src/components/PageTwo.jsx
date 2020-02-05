import React from "react";

import { Field, reduxForm, getFormValues } from "redux-form";
import { Col, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import friendsPic from "../assets/friends.jpeg";
import internetPic from "../assets/internet.png";
import tvPic from "../assets/tv.jpg";

export let PageTwo = ({ prevPage, nextPage, values }) => {
  //const { prevPage, nextPage } = props;
  const selectionStyle = {
    boxShadow: "0 0 5px 5px #2ecc71"
  };
  let selection;
  const friend = "friend";
  const internet = "internet";
  const tv = "tv";
  if (values) {
    selection = values.referral;
  }
  return (
    <Container>
      <h2 data-testid="MeditationWhy" style={{ textAlign: "center" }}>What brings you to CMCFlow</h2>
      <form className="row" onSubmit={nextPage}>
        <Col lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="referral"
              component="input"
              type="radio"
              value="friend"
            />
            <div
              className="card card-input"
              style={selection === friend ? selectionStyle : null}
            >
              <div className="card-body">
                <img
                  src={friendsPic}
                  alt="friends"
                  className="card-image-top"
                  style={{ width: "100%", height: "259px" }}
                />
                <div className="card-title">
                  <h3 style={{ textAlign: "center" }}>Friend</h3>
                </div>
              </div>
            </div>
          </label>
        </Col>
        <Col lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="referral"
              component="input"
              type="radio"
              value="internet"
            />
            <div
              className="card card-input"
              style={selection === internet ? selectionStyle : null}
            >
              <div className="card-body">
                <img
                  src={internetPic}
                  alt="internet"
                  className="card-image-top"
                  style={{ width: "100%", height: "259px" }}
                />
                <div className="card-title">
                  <h3 stye={{ textAlign: "center" }}>Internet</h3>
                </div>
              </div>
            </div>
          </label>
        </Col>
        <Col lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="referral"
              component="input"
              type="radio"
              value="tv"
            />
            <div
              className="card card-input"
              style={selection === tv ? selectionStyle : null}
            >
              <div className="card-body">
                <img
                  src={tvPic}
                  className="card-image-top"
                  style={{ width: "100%", height: "259px" }}
                  alt="tv"
                />
                <div className="card-title">
                  <h3 style={{ textAlign: "center" }}>TV</h3>
                </div>
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
            color="info"
            type="button"
            className="cancel-button"
            onClick={prevPage}
          >
            Previous
          </Button>
          <Button
            color="primary"
            type="button"
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

PageTwo = connect(state => ({
  values: getFormValues("quiz")(state)
}))(PageTwo);

export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageTwo);
