import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import Grid from "@mui/material/Grid"; // Grid version 1
import axios from "axios";
import ConfigData from "../../config/config";
const EditRestaurant = (props) => {
  const {   restaurantDetails, openEdit, setOpenEdit } = props;
  const [restaurantName, SetRestaurantName] = useState(
    restaurantDetails.restaurantName
  );
  const [adminName, setAdminName] = useState(restaurantDetails.adminName);
  const [category, setCategory] = useState(restaurantDetails.category);
  const [phone, setPhone] = useState(restaurantDetails.phone);
  const [email, setEmail] = useState(restaurantDetails.email);
  const [status, setStatus] = useState(restaurantDetails.status);
  const [id, setId] = useState(restaurantDetails._id);
  const [error, setError] = useState("");
  const [registerationDetails, setRegisterationDetails] = useState("");
  const [isSubmit, setisSubmit] = useState("");

  useEffect(() => {
    if (Object.keys(error).length == 0 && isSubmit) {
      registerUser(registerationDetails);
    } else {
      setisSubmit(false);
    }
  }, [error]);
  useEffect(() => {
    setOpenEdit(false)
    SetRestaurantName(restaurantDetails.restaurantName)
    setAdminName(restaurantDetails.adminName)
 setCategory (restaurantDetails.category)
  setPhone(restaurantDetails.setPhone)
   setEmail(restaurantDetails.email)
   setStatus(restaurantDetails.status)
  setId(restaurantDetails.id)
  }, [restaurantDetails]);
  const HandleClose=()=>{
    setOpenEdit(false)
    setAdminName('')
 setCategory ("")
  setPhone("")
   setEmail("")
   setStatus("")
  setId("")
  

  }
  const RegisterURL =
    ConfigData.ServerAddress + "/superadmin/addoredit-RestaurantAdmin";

  const onSubmit = (e) => {
    e.preventDefault();
    const registerDetails = {
      id: id,
      restaurantName: restaurantName,
      adminName: adminName,
      category: category,
      phone: phone,
      email: email,
    };
     
    setRegisterationDetails(registerDetails);
    setError(validateDetails(registerDetails));
    setisSubmit(true);
  };
  const registerUser = (registerData) => {
    axios
      .post(RegisterURL, {
        title: "Hello World!",
        body: registerData,
      })
      .then((res) => {
      
        window.location.href = ConfigData.originAddress + "/superadmin";
      });
  };

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
      error.email = "Email   required !!";
    }
  

    return error;
  };
  return (
    <Dialog open={openEdit}>
      <DialogTitle>
        <div>Something</div>
      </DialogTitle>
      <DialogContent>
        <div>
          <form onSubmit={onSubmit}>
            {" "}
            <Grid container spacing={6}>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Restuarant Name"
                  value={restaurantName}
                  onChange={(e) => SetRestaurantName(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.restaurantName}</p>
              </Grid>
              <Grid item s={2}>
                <TextField
                  id="outlined-baic"
                  label="Admin Name"
                  variant="outlined"
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.adminName}</p>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Category"
                  variant="outlined"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.category}</p>
              </Grid>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Phone"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.phone}</p>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.email}</p>
              </Grid>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Status"
                  variant="outlined"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.status}</p>
              </Grid>
            </Grid>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>

          <div>
            <Button onClick={HandleClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRestaurant;
