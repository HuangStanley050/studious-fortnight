import React from "react";
import renderField from "./renderField";
import { connect } from "react-redux";
import axios from "axios";
import API from "../api";
import { Field, reduxForm, getFormValues } from "redux-form";

let PageFour = ({ values, prevPage }) => {
  const submitHandler = async e => {
    e.preventDefault();
    const { experience } = values;
    let startingChoice;
    if (experience === "No experience") {
      startingChoice = "beginner";
    } else if (experience === "Some experience") {
      startingChoice = "intermediate";
    } else {
      startingChoice = "expert";
    }
    const token = localStorage.getItem("CMCFlow");
    let result = axios({
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: API.setCourse,
      data: { startingChoice }
    });
    console.log(result.data);
  };
  return (
    <form onSubmit={submitHandler}>
      <h1>Page Four</h1>
      <h2>Preferred Meditation Time</h2>
      <div>
        <div>
          <label>
            <Field name="time" component="input" type="radio" value="morning" />
            Morning
          </label>
        </div>
        <div>
          <label>
            <Field
              name="time"
              component="input"
              type="radio"
              value="afternoon"
            />
            Afternoon
          </label>
        </div>
        <div>
          <label>
            <Field name="time" component="input" type="radio" value="night" />
            Night
          </label>
        </div>
      </div>
      <button type="button" className="previous" onClick={prevPage}>
        Previous
      </button>
      <button>Submit</button>
    </form>
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
