import React from "react";

const renderField = ({
  input,
  label,
  type,
  className,
  meta: { touched, error }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input className={className} {...input} placeholder={label} type={type} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

export default renderField;
