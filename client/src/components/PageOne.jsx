import React from "react";
import renderField from "./renderField";
import { Field, reduxForm } from "redux-form";

const PageOne = props => {
  const { nextPage } = props;
  return (
    <form onSubmit={nextPage}>
      <h1>Page one</h1>
      <h2>how much exp do you have?</h2>
      <div>
        <div>
          <label>
            <Field
              name="experience"
              type="radio"
              component={renderField}
              value="No experience"
            />{" "}
            No experience
          </label>
        </div>
        <div>
          <label>
            <Field
              name="experience"
              type="radio"
              component={renderField}
              value="Some experience"
            />{" "}
            Some experience
          </label>
        </div>
        <div>
          <label>
            <Field
              name="experience"
              type="radio"
              component={renderField}
              value="Expert experience"
            />{" "}
            Expert experience
          </label>
        </div>
      </div>

      <div>
        <button type="submit" className="next">
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
})(PageOne);
