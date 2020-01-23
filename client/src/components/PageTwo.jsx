import React from "react";
import renderField from "./renderField";
import { Field, reduxForm } from "redux-form";

const PageTwo = props => {
  const { prevPage, nextPage } = props;
  return (
    <form>
      <h1>Page two</h1>
      <h2>What brings you to CMCFlow</h2>

      <div>
        <label>Referral</label>
        <div>
          <label>
            <Field
              name="referral"
              component="input"
              type="radio"
              value="friend"
            />{" "}
            Friend
          </label>
          <label>
            <Field
              name="referral"
              component="input"
              type="radio"
              value="internet"
            />{" "}
            Internet
          </label>
          <label>
            <Field name="referral" component="input" type="radio" value="tv" />{" "}
            TV
          </label>
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={prevPage}>
          Previous
        </button>
        <button type="button" className="next" onClick={nextPage}>
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "quiz", // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(PageTwo);
