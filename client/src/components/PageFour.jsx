import React from "react";

import { connect } from "react-redux";
import axios from "axios";
import API from "../api";
import { closeQuiz } from "../store/actions/quizActions";
import { Field, reduxForm, getFormValues } from "redux-form";
import morningPic from "../assets/morning.jpeg";
import noonPic from "../assets/noon.jpg";
import nightPic from "../assets/night.jpeg";
import { Container, Col, Button } from "reactstrap";

let PageFour = ({ values, prevPage, dispatch }) => {
  let selection;
  const morning = "morning";
  const afternoon = "afternoon";
  const night = "night";
  const selectionStyle = {
    boxShadow: "0 0 5px 5px #2ecc71"
  };
  const submitHandler = async e => {
    e.preventDefault();
    let experience;
    if (!values) {
      experience = "No experience";
    } else {
      experience = values.experience;
    }

    let startingChoice;
    if (experience === "No experience") {
      startingChoice = "beginner";
    } else if (experience === "Some experience") {
      startingChoice = "intermediate";
    } else {
      startingChoice = "expert";
    }
    const token = localStorage.getItem("CMCFlow");
    let result = await axios({
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: API.setCourse,
      data: { startingChoice }
    });
    //console.log(result.data);
    dispatch(closeQuiz(result.data));
  };

  if (values) {
    selection = values.time;
  }
  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>Preferred Meditation Time</h2>
      <form className="row" onSubmit={submitHandler}>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="time"
              component="input"
              type="radio"
              value="morning"
            />
            <div
              className="card card-input"
              style={selection === morning ? selectionStyle : null}
            >
              <div className="card-body">
                <img
                  src={morningPic}
                  className="card-image-top"
                  alt="morning"
                  style={{ width: "278px", height: "259px" }}
                />
                <div className="card-title">Morning</div>
              </div>
            </div>
          </label>
        </Col>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="time"
              component="input"
              type="radio"
              value="afternoon"
            />
            <div
              className="card card-input"
              style={selection === afternoon ? selectionStyle : null}
            >
              <div className="card-body">
                <img
                  src={noonPic}
                  className="card-image-top"
                  alt="morning"
                  style={{ width: "278px", height: "259px" }}
                />
                <div className="card-title">Afternoon</div>
              </div>
            </div>
          </label>
        </Col>
        <Col sm="4" md="4" lg="4">
          <label className="special-label">
            <Field
              className="card-input-element"
              name="time"
              component="input"
              type="radio"
              value="night"
            />
            <div
              className="card card-input"
              style={selection === night ? selectionStyle : null}
            >
              <div className="card-body">
                <img
                  src={nightPic}
                  className="card-image-top"
                  alt="morning"
                  style={{ width: "278px", height: "259px" }}
                />
                <div className="card-title">Night</div>
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
            className="previous"
            onClick={prevPage}
          >
            Previous
          </Button>
          <Button type="submit" color="danger">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

PageFour = connect(state => ({
  values: getFormValues("quiz")(state)
}))(PageFour);
export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageFour);
