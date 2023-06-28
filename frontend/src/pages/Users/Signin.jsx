import React from 'react';
import './style.css'
import { signin, isAuthenticated, authenticate } from "../../auth/helper/index"
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider'

const Signin = () => {
  const { currentColor } = useStateContext();
  console.log(currentColor)
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  // handleChange function to update state values when input fields are changed
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  // onSubmit function to handle form submission
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            didRedirect: true,
          });
        });
      }
    });
  };

  // performRedirect function to redirect user based on authentication and role
  const performRedirect = () => {
    if (isAuthenticated()) {
      //  <Redirect to="/" />;
      navigate("/");
      window.location.reload();


    }


  };

  // loadingMessage function to show a loading message
  const loadingMessage = () => {
    return (
      loading && (
        <div className="row ">
          <div className="col-md-6 offset-sm-3 text-center  text-slate-200">
            <div className="alert alert-info">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      )
    );
  };

  // errorMessage function to show error message
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-center text-slate-200">
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

  return (
    <>
      <div className='showcase' >
        <div className='video-container'>
          {/* <video src='bgVideo.mp4' autoPlay muted loop id='myVideo'> */}

          {/* </video> */}

        </div>
      </div>

      <div className='login-box '  >
        <h2>
          {loadingMessage()}
          {errorMessage()}
          Signin
        </h2>
        <form>
          {/* <div className='user-box'>
            <input type='text' name='' required='' />
            <label>Name</label>
                
            </div> */}
          <div className='user-box'>
            <input type='email'
              value={email}
              onChange={handleChange("email")}
              required />
            <label>Email</label>

          </div>

          <div className='user-box'>
            <input type='password'
              value={password}
              onChange={handleChange("password")}
              required />
            <label>Password</label>

          </div>
          <button type='submit' onClick={onSubmit}>
            Signin
          </button>
          <p>Need an account? <Link to="/signup">Signup here</Link></p>
        </form>
        {performRedirect()}
      </div>

    </>

  )
}

export default Signin;