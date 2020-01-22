import React from "react";
import renderField from "./renderField";
import { Field, reduxForm } from "redux-form";

const PageTwo = props => {
  const { prevPage } = props;
  return (
    <form>
      <Field name="email" type="email" component={renderField} label="Email" />
      <div>
        <label>Sex</label>
        <div>
          <label>
            <Field name="sex" component="input" type="radio" value="male" />{" "}
            Male
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="female" />{" "}
            Female
          </label>
          <label>
            <Field name="sex" component="input" type="radio" value="other" />{" "}
            Other
          </label>
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={prevPage}>
          Previous
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
