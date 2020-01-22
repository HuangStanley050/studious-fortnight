import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../api";
import axios from "axios";
import jwt_decode from "jwt-decode";

/*
id.match(/^[0-9a-fA-F]{24}$/)
 */
const PasswordReset = ({ userId, token }) => {
  // check if the route params is valid
  // prevent user from getting to it directly from client side
  // this will only load from the link opened from user email
  const [passwordDetail, setPasswordDetail] = useState({
    password: "",
    confirmPassword: ""
  });
  const handleChange = e => {
    setPasswordDetail({
      ...passwordDetail,
      [e.target.name]: e.target.value
    });
  };
  // if (!userId.match(/^[0-9a-fA-F]{24}$/) || !jwt_decode(token)) {
  //   console.log("not a valid userId");
  //   return <Redirect to="/" />;
  // }
  const handleSubmit = e => {
    e.preventDefault();
    console.log(passwordDetail);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Password reset form</h1>
        <div>
          <input
            type="password"
            name="password"
            value={passwordDetail.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="password"
            name="confirmPassword"
            value={passwordDetail.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PasswordReset;
