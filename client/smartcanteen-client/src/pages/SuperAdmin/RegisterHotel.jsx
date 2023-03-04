import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import Select from "react-select";
import axios from "axios";
import ConfigData from "../../config/config";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./RegisterHotel.css";
import { Button } from "@mui/material";


const RegisterHotel = () => {
  //usestate
  const [RestaurantName, setRestaurantName] = useState("");
  const [adminName, setAdminName] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [street, setStreet] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");
  const [agreed, setAgreed] = useState("");
  const [error, setError] = useState("");
  const [isSubmit, setisSubmit] = useState("");
  const [registerationDetails, setRegisterationDetails] = useState("");

  const options = [
 
    { value: " Fast food restaurants", label: " Fast food restaurants" },
    { value: "Casual dining restaurants", label: "Casual dining restaurants" },
    { value: "Contemporary casual restaurants", label: "Contemporary casual restaurants" },
    { value: "Fast casual restaurants", label: "Fast casual restaurants" },
    { value: "Cafés", label: "Cafés" },
    { value: "Pizzerias", label: "Pizzerias" },
     { value: "Pop-up restaurants", label: "Pop-up restaurants" },
  ];
  const HandleCateogoryChange = (e) => {
    setCategory(e.value);
  };

  //validates the data enterd in form
  const validateDetails = (data) => {
    var error = {};
    if (!data.restaurantName) {
      error.restaurantName = "Restaurant name required !!";
    }
    if (!data.adminName) {
      error.adminName = "Admin name required !!";
    }
    if (!data.category) {
      error.category = "Category required !!";
    }
    if (!data.phone) {
      error.phone = "Phone required !!";
    }
    if (!data.email) {
      error.email = "Email name required !!";
    }
    if (!data.password) {
      error.password = "Password name required !!";
    }

    if (!data.street) {
      error.street = "Street required !!";
    }
    if (!data.district) {
      error.district = "District required !!";
    }
    if (!data.state) {
      error.state = "State required !!";
    }
    if (!data.country) {
      error.country = "Country required !!";
    }
    if (!data.zipCode) {
      error.zipCode = "Zip Code required !!";
    }
    return error;
  };

  // calls when register button clicks
  const handleSubmit = (e) => {
    e.preventDefault();
    const registerDetails = {
      id:0,
      restaurantName: RestaurantName,
      adminName: adminName,
      category: category,
      phone: phone,
      email: email,
      password: Password,
      street: street,
      district: district,
      zipCode: zipCode,
      state: state,
      country: country,
    };
    setRegisterationDetails(registerDetails);
    setError(validateDetails(registerDetails));
    setisSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length == 0 && isSubmit) {
      registerUser(registerationDetails);
    } else {
      setisSubmit(false);
    }
  }, [error]);
  // sending data to the back
  const RegisterURL =
    ConfigData.ServerAddress + "/superadmin/addoredit-RestaurantAdmin"
  const registerUser = (registerData) => {
 
    axios
      .post(RegisterURL, {
        title: "Hello World!",
        body: registerData,
      })
      .then((res) => {
 console.log("response is",res);
        
      })
       
  };
  return (
    <form onSubmit={handleSubmit}>
      <MDBContainer fluid className="h-custom">
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12" className="m-5">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow>
                  <MDBCol md="6" className="p-5 bg-white">
                    <h3 className="fw-normal mb-5" style={{ color: "#4835d4" }}>
                      Hotel Infomation
                    </h3>

                    {/* //FisrtName Section */}
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-1"
                          label="Restaurant Name"
                          size="lg"
                          id="form1"
                          type="text"
                          value={RestaurantName}
                          onChange={(e) => {
                            setRestaurantName(e.target.value);
                          }}
                        />
                        <p>{error.restaurantName}</p>
                        {/* 
                      last name section */}
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-1"
                          label="Restaurant Admin Name"
                          size="lg"
                          id="form2"
                          type="text"
                          value={adminName}
                          onChange={(e) => {
                            setAdminName(e.target.value);
                          }}
                        />
                        <p>{error.adminName}</p>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow md="6">
                      <MDBCol>
                        <Select
                          options={options}
                          onChange={(e) => {
                            HandleCateogoryChange(e);
                          }}
                        />
                        <span>Category</span>
                        <p>{error.category}</p>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mt-4"
                          label="Phone Number"
                          size="lg"
                          id="form4"
                          type="text"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        />
                        <p>{error.phone}</p>
                      </MDBCol>

                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mt-4"
                          label="Email "
                          size="lg"
                          id="form4"
                          type="Email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                        <p>{error.email}</p>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mt-4"
                          label="Password "
                          size="lg"
                          id="form4"
                          type="password"
                          value={Password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                        <p>{error.password}</p>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>

                  <MDBCol md="6" className="bg-indigo p-5">
                    <h3
                      className="fw-normal mb-5 text-white"
                      style={{ color: "#4835d4" }}
                    >
                      Address Details
                    </h3>
                    <MDBInput
                      wrapperClass="mb-1"
                      labelClass="text-white"
                      label="Street + Nr"
                      size="lg"
                      id="form5"
                      type="text"
                      value={street}
                      onChange={(e) => {
                        setStreet(e.target.value);
                      }}
                    />
                    <p>{error.street}</p>
                    <MDBRow>
                      <MDBCol md="5">
                        <MDBInput
                          wrapperClass="mb-1"
                          labelClass="text-white"
                          label="District"
                          size="lg"
                          id="form6"
                          type="text"
                          value={district}
                          onChange={(e) => {
                            setDistrict(e.target.value);
                          }}
                        />
                        <p>{error.district}</p>
                      </MDBCol>

                      <MDBCol md="7">
                        <MDBInput
                          wrapperClass="mb-1"
                          labelClass="text-white"
                          label="State"
                          size="lg"
                          id="form7"
                          type="text"
                          value={state}
                          onChange={(e) => {
                            setState(e.target.value);
                          }}
                        />
                        <p>{error.state}</p>
                      </MDBCol>
                    </MDBRow>

                    <MDBInput
                      wrapperClass="mb-1"
                      labelClass="text-white"
                      label="Country"
                      size="lg"
                      id="form8"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    />
                    <p>{error.country}</p>

                    <MDBRow>
                      <MDBCol md="6">
                        <MDBInput
                          wrapperClass="mb-1"
                          labelClass="text-white"
                          label="Zip Code"
                          size="lg"
                          id="form8"
                          type="text"
                          value={zipCode}
                          onChange={(e) => {
                            setZipCode(e.target.value);
                          }}
                        />
                        <p>{error.zipCode}</p>
                      </MDBCol>
                    </MDBRow>

                    <MDBCheckbox
                      name="flexCheck"
                      id="flexCheckDefault"
                      labelClass="text-white mb-1"
                      label="I do accept the Terms and Conditions of your site."
                      value={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.value);
                      }}
                    />
                    <Button
                      style={{
                        borderRadius: 10,
                        backgroundColor: "white",
                        padding: "13px 28px",
                        fontSize: "14px",
                        color: "black",
                      }}
                      variant="contained"
                      id="submitbutton"
                      type="submit"
                    >
                      {" "}
                      Register{" "}
                    </Button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

export default RegisterHotel;
