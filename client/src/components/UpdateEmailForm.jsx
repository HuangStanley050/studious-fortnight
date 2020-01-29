import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import API from "../api";
import Loader from "../components/Loader";

const UpdateEmailForm = ({user}) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => { 
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
      setLoading(false);
      //turn loading screen off

      switch (response.data) {
        case "success":
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
    }
    updateEmailFunc();
  }

  return (
    <>
    {loading ? 
      <Loader />
    : 
      <>
      <label>Update Email Address</label><br />
      <form onSubmit={handleSubmit(onSubmit)}>
          <input 
            className="account-update-section"
            name="email" 
            defaultValue={user.email} 
            ref={register({ required: true, pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ })} 
          />
          {errors.email && <span>Please enter a valid email</span>}
          <input 
            className="update-email-button"
            type="submit" 
            value="UPDATE"
          /> 
      </form>
      </>
    }
    </>
  );
};

export default UpdateEmailForm;