import React from "react";
import renderField from "./renderField";
import { Field, reduxForm } from "redux-form";

const PageFour = props => {
  const { prevPage } = props;
  return (
    <form>
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

export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageFour);
