import React, { useState } from "react";
import axios from "axios";
import API from "../api";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const handleChange = e => {
    setEmail(e.target.value);
  };
  const handleSubmit = async e => {
    e.preventDefault();
    //console.log(email);
    let result = await axios.post(API.resetPassword, { email });
    setEmail("");
    console.log(result.data);
  };
  return (
    <div>
      <h1>Password Recovery form</h1>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={handleChange} type="email" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PasswordRecovery;
