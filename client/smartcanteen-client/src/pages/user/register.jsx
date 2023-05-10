import React, { useState, useEffect } from "react";
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
import { createTheme, ThemeProvider } from "@mui/material/styles";
 import "./userLogin.css"
import ConfigData from "../../config/config";
import axios  from "axios";
const theme = createTheme();

export default function UserRegister() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [errorId, setErrorId] = useState([]);
  const [isSubmit, setisSubmit] = useState(false);
  const [registerDetails, setRegisterDetails] = useState({});
  const [finalError, setFinalError] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (Object.keys(error).length == 0 && isSubmit) {
      registerUser();
    } else {
      setisSubmit(false);
    }
  }, [errorId]);
  const registerURL = ConfigData.ServerAddress + "/register";
  const registerUser = () => {
    axios
      .post(registerURL, {
      registerDetails,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          setFinalError("");
        
        }
      })
      .catch((err) => {
        console.log("error ise", err.response.data.err);
        setFinalError(err.response.data.err);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    setRegisterDetails(loginData);
    setError(validateDetails(loginData));
    setisSubmit(true);
    checkError();
  };
  const checkError = () => {
    setErrorId(Date.now().toString());
  };
  const validateDetails = (data) => {
    var error = {};

    if (!data.email) {
      error.email = "email required !!";
    }
    if (!data.password) {
      error.password = "password required";
    }
    setFinalError("");
    return error;
  };
  return (
    
    <MDBContainer className="p-3 my-5 d-flex flex-column w-80 mt-30">
      <h3>Register</h3>
<form onSubmit={handleSubmit}>
    <MDBInput className="login-text" wrapperClass='mb-4 login-text' label='Email address' id='form1' type='email'  onChange={(e) => {
                setEmail(e.target.value);
              }}/>
              <p>{error.email}</p>
    <MDBInput className="login-text" wrapperClass='mb-4 login-text' label='Password' id='form2' type='password'  onChange={(e) => {
                setPasswod(e.target.value);
              }}/> 
    <p>{error.password}</p>
    <MDBBtn type="submit" className="mb-4" style={{ backgroundColor: '#ccaa6a',borderColor:" #ccaa6a"}}>Register</MDBBtn>

    <div className="text-center">
      <p className="login-text">Already have account ? <a href="/user_login" >Login</a></p>
      {/* <p>or sign up with:</p>

      <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#ccaa6a' }}>
          <MDBIcon fab icon='facebook-f' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#ccaa6a' }}>
          <MDBIcon fab icon='twitter' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#ccaa6a' }}>
          <MDBIcon fab icon='google' size="sm"/>
        </MDBBtn>

        <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#ccaa6a' }}>
          <MDBIcon fab icon='github' size="sm"/>
        </MDBBtn>

      </div> */}
      
    </div>
    </form>
  </MDBContainer>

  );
}
