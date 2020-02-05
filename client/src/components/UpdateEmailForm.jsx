import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import API from "../api";
import Loader from "../components/Loader";

const UpdateEmailForm = ({ user }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(user.email);

  useEffect(() => {
  }, [email])

  const onSubmit = data => {
    const updateEmailFunc = async () => {
      const token = localStorage.getItem("CMCFlow");
      //turn loading screen on
      setLoading(true);
      const response = await axios({
        headers: { Authorization: `bearer ${token}` },
        data: { email: data.email },
        method: "post",
        url: API.updateEmail
      });
      switch (response.data) {
        case "success":
          setEmail(data.email);
          window.alert("Email updated.");
          break;
        case "failure":
          window.alert("That email is already taken.");
          break;
        case "no change":
          window.alert("This is already your email.");
          break;
        default:
          break;
      }

      //turn loading screen off
      setLoading(false);
    };
    updateEmailFunc();
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <label>Update Email Address</label>
          <br />
          <form data-testid="updateEmailForm" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="account-update-section"
              name="email"
              defaultValue={email}
              ref={register({
                required: true,
                pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
              })}
            />
            {errors.email && <span>Please enter a valid email</span>}
            <input
              className="update-email-button"
              type="submit"
              value="UPDATE"
            />
          </form>
        </>
      )}
    </>
  );
};

export default UpdateEmailForm;
