import React from 'react';
import './style.css'

import { signup } from "../../auth/helper/index"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { redirect } from 'react-router-dom';
const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  // Destructure state values
  const { name, email, password, error, success } = values;

  // Event handler for form inputs
  const handelChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // Event handler for form submission
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
    });

    // Call signup method and handle success/error
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  // Function to render success message
  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center  text-slate-200">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account created successfully.{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center  text-slate-200">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const onClickHandle = () => {
    return <redirect to="/signin" />;
  }






  return (
    <>
      <div className='showcase'>
        <div className='video-container'>
          <video src='bgVideo.mp4' autoPlay muted loop id='myVideo'>

          </video>

        </div>
      </div>

      <div className='login-box'>
        <h2>
          {successMessage()}
          {errorMessage()}
          Signup
        </h2>
        <form>
          <div className='user-box'>
            <input type='text'
              value={name}
              onChange={handelChange("name")}
              required />
            <label>Name</label>

          </div>
          <div className='user-box'>
            <input type='email'
              value={email}
              onChange={handelChange("email")}
              required />
            <label>Email</label>

          </div>

          <div className='user-box'>
            <input type='password'
              value={password}
              onChange={handelChange("password")}
              required />
            <label>Password</label>

          </div>
          <button type='submit' onClick={onSubmit} >
            Signup
          </button>
          <p>Already Have an Account? <Link to="/signin">Signin here</Link></p>
        </form>
      </div>







    </>

  )
}

export default Signup