import React from "react";
import renderField from "./renderField";
import { Field, reduxForm } from "redux-form";

const PageOne = props => {
  const { nextPage } = props;
  return (
    <form onSubmit={nextPage}>
      <h1>Page one</h1>
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
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
