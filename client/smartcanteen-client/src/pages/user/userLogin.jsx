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
import { Button } from "react-bootstrap";
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
  useEffect(()=>{
    const user=JSON.parse( localStorage.getItem("user"))
    localStorage.removeItem("user")
    axios.post(ConfigData.ServerAddress+"/logout").then(()=>{
  })
  },[])
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
    let restaurant_id;
    if(restaurant){
      restaurant_id= restaurant._id;
    }

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
          localStorage.setItem("user", JSON.stringify(res.data));
          window.location.href=ConfigData.originAddress+`/menu-list/${restaurant_id}/${tableNo}`;
        } 
      })
      .catch((err) => {
        console.log("error ise", err.response.data.err);
        alert(err.message)
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
      <h3>Login</h3>
<form onSubmit={handleSubmit}>
    <MDBInput className="login-text" wrapperClass='mb-4 login-text' label='Email address' id='form1' type='email'  onChange={(e) => {
                setEmail(e.target.value);
              }}/>
              <p>{error.email}</p>
    <MDBInput className="login-text" wrapperClass='mb-4 login-text' label='Password' id='form2' type='password'  onChange={(e) => {
                setPasswod(e.target.value);
              }}/> 
    <p>{error.password}</p>
    <Button type="submit" className="mb-4" style={{ backgroundColor: '#ccaa6a',borderColor:" #ccaa6a"}}>Sign in</Button>

    <div className="text-center">
      <p className="login-text">Not a member? <a href={"/register"} >Register</a></p>
 
      
    </div>
    </form>
  </MDBContainer>

  );
}
