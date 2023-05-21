import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import ConfigData from "../config/config";
const theme = createTheme();
export default function SignIn() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [errorId, setErrorId] = useState([]);
  const [isSubmit, setisSubmit] = useState(false);
  const [loginDetails, setLoginDetails] = useState({});
  const [finalError, setFinalError] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    localStorage.removeItem("user")
  })
  useEffect(() => {
    if (Object.keys(error).length == 0 && isSubmit) {
      LoginUser();
    } else {
      setisSubmit(false);
    }
  }, [errorId]);
  const LoginURL = ConfigData.ServerAddress + "/login";
  const LoginUser = () => {
    axios
      .post(LoginURL, {
        body: loginDetails,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status == 200) {
          setFinalError("");
          alert(res.data.role);
          localStorage.setItem("user", JSON.stringify(res.data));
          if (res.data.role == "superAdmin") {
            window.location.href = ConfigData.originAddress + "/superadmin";
          } else if (res.data.role == "admin") {
            window.location.href = ConfigData.originAddress + "/admin";
          } else {
            window.location.href = ConfigData.originAddress;
          }
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "300px", alignItems: "center" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p>{error.email}</p>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPasswod(e.target.value);
              }}
            />
            {<p>{error.password}</p>}
            {<p>{finalError}</p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
