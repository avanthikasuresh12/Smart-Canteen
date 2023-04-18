import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  TextField,
} from "@mui/material";

import Grid from "@mui/material/Grid"; // Grid version 1
import axios from "axios";
import ConfigData from "../../../config/config";
import CategoryOptions from "../../../config/restaurantCategories";
import ReactSelect from "react-select";
import { MDBBadge } from "mdb-react-ui-kit";
const EditProfile = (props) => {
  var { restaurantDetails, openEdit, setOpenEdit, resetEdit, randomId } = props;
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
  const [active, setActive] = useState(restaurantDetails.active);
  const [password, setPassword] = useState("");
    const [state,setState]=useState(restaurantDetails.state)
  const [city,setCity]=useState(restaurantDetails.city)
  const [district,setDistrict]=useState(restaurantDetails.district)
  const [regCallID, setRegCallID] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (Object.keys(error).length == 0 && isSubmit) {
      registerUser(registerationDetails);
    } else {
      setisSubmit(false);
    }
  }, [regCallID]);
  const setCheckError = () => {
    setRegCallID(Date.now().toString());
  };
  const hotelStatusOption = [
    {
      value: true,
      label: (
        <MDBBadge color="success" pill>
          Active
        </MDBBadge>
      ),
    },
    {
      value: false,
      label: (
        <MDBBadge color="danger" pill>
          De Active
        </MDBBadge>
      ),
    },
  ];
  useEffect(() => {
    SetRestaurantName(restaurantDetails.restaurantName);
    setAdminName(restaurantDetails.adminName);
    setCategory(restaurantDetails.category);
    setPhone(restaurantDetails.phone);
    setEmail(restaurantDetails.email);
    setStatus(restaurantDetails.status);
    setId(restaurantDetails._id);
    setActive(restaurantDetails.active);
    setPassword(restaurantDetails.password);
    setDistrict(restaurantDetails.district)
    setCity(restaurantDetails.city)
    setState(restaurantDetails.state)
  }, [restaurantDetails, randomId]);
  const HandleClose = () => {
    setOpenEdit(false);
    setError("");
    resetEdit();
  };
  const RegisterURL = ConfigData.ServerAddress + "/admin/edit-profile";

  const onSubmit = (e) => {
    e.preventDefault();
    const registerDetails = {
      id: id,
      restaurantName: restaurantName,
      adminName: adminName,
      category: category,
      phone: phone,
      email: email,
      district:district,
      state:state,
      city:city,
      password:password,
    };
  
    setRegisterationDetails(registerDetails);
    setError(validateDetails(registerDetails));
    setisSubmit(true);
    setCheckError();
  };
  const HandlePassword = (e) => {
    setPassword(e.target.value);
  };
  const registerUser = async (registerData) => {
    axios.defaults.withCredentials = true;
    await axios
      .post(RegisterURL, {
        body: registerData,
      })
      .then((res) => {
        if (res.status == 200) {
          restaurantDetails = {};
          HandleClose();
        }
      });
  };
  const HandleCateogoryChange = (c) => {
    setCategory(c.value);
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
    if (!data.city) {
      error.city = "City   required !!";
    } if (!data.state) {
      error.state = "State   required !!";
    } if (!data.district) {
      error.state = "District   required !!";
    }

    return error;
  };
  return (
    <Dialog open={openEdit} fullWidth maxWidth="sm">
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
              <Grid item xl={12}>
                <div style={{ width: "220px" }}>
                  <ReactSelect
                    maxMenuHeight={"200px"}
                    defaultValue={
                      restaurantDetails._id == 0
                        ? { label: "category", value: "" }
                        : {
                            label: restaurantDetails.category,
                            value: restaurantDetails.category,
                          }
                    }
                    options={CategoryOptions}
                    onChange={(e) => {
                      HandleCateogoryChange(e);
                    }}
                  />
                  <p>{error.category}</p>
                </div>
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
            </Grid>
            <Grid container spacing={6}>
          
              <Grid item s={2}>
                <h3>Address</h3>
                <TextField
                  id="outlined-basic"
                  label="City"
                  variant="outlined"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.city}</p>
              </Grid>
            </Grid>
            <Grid container spacing={6}>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="District"
                  variant="outlined"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.district}</p>
              </Grid>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="State"
                  variant="outlined"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.state}</p>
              </Grid>
            </Grid>
        
            
              <Grid item s={2} className="mt-9">

                <h3> Change Password</h3>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                 value={password}
                  onChange={(e) => HandlePassword(e)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.password}</p>
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

export default EditProfile;
