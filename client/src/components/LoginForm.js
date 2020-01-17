import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Form = (props) => {
  const { register, handleSubmit, watch, errors } = useForm()

  const onSubmit = (data) => { 
    console.log(data) 

    axios.post(`/auth/local/login`, data).then((response) => {
      console.log(response.data);
      // props.history.push('/');
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input name="email" placeholder="email" ref={register({required: true, minLength: 4, maxLength: 15 })} />
      {errors.name && "Please add an email between 4 and 15 characters."}
      <br />
      <input name="password" placeholder="password" ref={register({ required: true })} />
      {errors.location && "Please add a location."}
      <br />
      <input type="submit" />
      <br />
      <a href="/auth/google"><p> Google </p></a>
      <a href="/auth/facebook"><p> Facebook </p></a> 
    </form>
  )
};

export default Form;