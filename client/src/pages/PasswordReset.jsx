import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

/*
id.match(/^[0-9a-fA-F]{24}$/)
 */
const PasswordReset = ({ userId, token }) => {
  // check if the route params is valid
  // prevent user from getting to it directly from client side
  // this will only load from the link opened from user email
  if (!userId.match(/^[0-9a-fA-F]{24}$/) || !jwt_decode(token)) {
    console.log("not a valid userId");
    return <Redirect to="/" />;
  }
  return <h1>Password reset form</h1>;
};

export default PasswordReset;
