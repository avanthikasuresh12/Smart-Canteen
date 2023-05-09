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

export default function UserLogin() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [errorId, setErrorId] = useState([]);
  const [isSubmit, setisSubmit] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [finalError, setFinalError] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (Object.keys(error).length == 0 && isSubmit) {
      LoginUser();
    } else {
      setisSubmit(false);
    }
  }, [errorId]);
  const LoginURL = ConfigData.ServerAddress + "/user_login";
  const LoginUser = () => {
    let restaurant=JSON.parse(localStorage.getItem("restaurant"))
    const restaurant_id= restaurant._id;
    const tableNo=   localStorage.getItem("table")
    axios
      .post(LoginURL, {
         loginDetails,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) { 
          setFinalError("");
          localStorage.setItem("user", JSON.stringify(res.data));
        alert(localStorage.getItem("user"))
          window.location.href=ConfigData.originAddress+`/menu-list/${restaurant_id}/${tableNo}`;
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
    setLoginDetails(loginData);
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
<form onSubmit={handleSubmit}>
    <MDBInput className="login-text" wrapperClass='mb-4 login-text' label='Email address' id='form1' type='email'  onChange={(e) => {
                setEmail(e.target.value);
              }}/>
              <p>{error.email}</p>
    <MDBInput className="login-text" wrapperClass='mb-4 login-text' label='Password' id='form2' type='password'  onChange={(e) => {
                setPasswod(e.target.value);
              }}/> 
    <p>{error.password}</p>
    <MDBBtn type="submit" className="mb-4" style={{ backgroundColor: '#ccaa6a',borderColor:" #ccaa6a"}}>Sign in</MDBBtn>

    <div className="text-center">
      <p className="login-text">Not a member? <a href="#!" >Register</a></p>
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
