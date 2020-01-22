import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

import API from "../api";
import axios from "axios";
import jwt_decode from "jwt-decode";

/*
id.match(/^[0-9a-fA-F]{24}$/)
 */
const PasswordReset = ({ userId, token, history }) => {
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
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      let result = await axios({
        headers: { Authorization: `bearer ${token}` },
        method: "post",
        url: API.newPassword,
        data: { email: passwordDetail.password }
      });
      setPasswordDetail({
        ...passwordDetail,
        password: "",
        confirmPassword: ""
      });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  if (!userId.match(/^[0-9a-fA-F]{24}$/) || !jwt_decode(token)) {
    console.log("not a valid userId or token");
    return <Redirect to="/" />;
  }
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

export default withRouter(PasswordReset);
