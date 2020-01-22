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
  const handleSubmit = async e => {
    e.preventDefault();
    let result = await axios({
      headers: { Authorization: `bearer ${token}` },
      method: "post",
      url: API.newPassword,
      data: { email: passwordDetail.password }
    });
    console.log(result.data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Password reset form</h1>
        <div>
          <h4>Password</h4>
          <input
            type="password"
            name="password"
            value={passwordDetail.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <h4>Confirm Password</h4>
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
