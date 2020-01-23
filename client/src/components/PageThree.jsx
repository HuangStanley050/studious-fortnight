import React from "react";
import renderField from "./renderField";
import { Field, reduxForm } from "redux-form";

const PageThree = props => {
  const { prevPage, nextPage } = props;
  return (
    <form>
      <h1>Page three</h1>
      <h2>Rough Estimate of your meditation time</h2>
      <div>
        <div>
          <label>
            <Field name="duration" component="input" type="radio" value="5" />5
            mins
          </label>
        </div>
        <div>
          <label>
            <Field name="duration" component="input" type="radio" value="10" />
            10 mins
          </label>
        </div>
        <div>
          <label>
            <Field name="duration" component="input" type="radio" value="60" />
            60 mins plus
          </label>
        </div>
      </div>
      <button type="button" className="previous" onClick={prevPage}>
        Previous
      </button>
      <button type="button" className="next" onClick={nextPage}>
        Next
      </button>
    </form>
  );
};

export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageThree);
