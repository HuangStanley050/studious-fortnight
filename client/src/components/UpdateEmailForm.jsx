import React from 'react';
import { useForm } from 'react-hook-form';

const UpdateEmailForm = ({user}) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  return (
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
  );
};

export default UpdateEmailForm;