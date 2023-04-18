import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";

import Grid from "@mui/material/Grid"; // Grid version 1
import axios from "axios";
 import ReactSelect from "react-select"
import { MDBBadge } from "mdb-react-ui-kit";
import ConfigData from "../../../config/config";
const EditMenuItem = (props) => {
  
  var {menuDetails, openEdit, setOpenEdit, resetEdit, randomId } = props;
  const [name, setName] = useState(menuDetails.name);
  const [description, setDescription] = useState(menuDetails.description);
  const [id,setId]=useState(menuDetails._id)
  const [price, setPrice] = useState(menuDetails.price);
  const [offer, setOffer] = useState(menuDetails.offer);
   const [available, setAvailable] = useState(menuDetails.available);
   const [category,setCategory]=useState(menuDetails.category)
  const [regCallID, setRegCallID] = useState("");
  const [error, setError] = useState("");
  const [registerationDetails, setRegisterationDetails] = useState("");
  const [isSubmit, setisSubmit] = useState("");
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
  const availableOption = [
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
    setName(menuDetails.name);
    setDescription(menuDetails.description);
    setId(menuDetails._id)
    setAvailable(menuDetails.available)
    setOffer(menuDetails.offer)
    setPrice(menuDetails.price)
    setCategory(menuDetails.category)
  }, [menuDetails, randomId]);
  const HandleClose = () => {
    setOpenEdit(false);
    setError("");
    resetEdit();
  };
  const CategoryOptions=[
    ""
  ]
  const menuAddUR = ConfigData.ServerAddress + "/admin/addoredit-menuitem";

  const onSubmit = (e) => {
 
    e.preventDefault();
    const registerDetails = {
      id: id,
      name: name,
      description: description,
      price:price,
      offer:offer,
      available:available,
      category:category,
    };
  
    setRegisterationDetails(registerDetails);
    setError(validateDetails(registerDetails));
    setisSubmit(true);
    setCheckError();
  };
 
  const registerUser = async (registerData) => {
    axios.defaults.withCredentials = true;
    
    await axios
      .post(menuAddUR, {
     data:registerData
      }) 
      .then((res) => {
        if (res.status == 200) {
          resetEdit();
          HandleClose();
        }
      });
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
  const validateDetails = (data) => {
    
    var error = {};
    if (!data.name) {
      error.name = "Menu item name required !!";
    }
    if (!data.description) {
      error.description = "Description required !!";
    }
    if (!data.price) {
        error.price = "Price required !!";
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
            <Grid container spacing={6} className="mb-10">
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Item Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.name}</p>
              </Grid>
              <Grid item s={2}>
              <textarea
                  id="outlined-basic"
                  label="State"
                  variant="outlined"
                placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                 
                  
                />
              </Grid>
            </Grid>
       
      
              <Grid container spacing={6}>
              { <Grid item xl={12}>
                <div style={{ width: "220px" }}>
                  <ReactSelect
                    maxMenuHeight={"200px"}
                    defaultValue={     menuDetails._id==0 ? {label:"category",value:""}:{
                 
                      label: "restaurantDetails.category",
                      value: "restaurantDetails.category",
                    }}
                    options={CategoryOptions}
                    onChange={(e) => {
                   //   HandleCateogoryChange(e);
                    }}
                  />
                  <p>{error.category}</p>
                </div>
                
              </Grid> }
            
            </Grid>
            <Grid container spacing={6}>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.price}</p>
                <h5>Actual price: {price-(offer/100)*price}</h5>
              </Grid>
            
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Offer"
                  variant="outlined"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.price}</p>
               
              </Grid>
        
              <Grid item s={2}>
             
            <div style={{ width: "220px" }}>
                  <ReactSelect
                    maxMenuHeight={"200px"}
                    placeholder={menuDetails.active?  <MDBBadge color='success' pill>
                    Active
                  </MDBBadge>:  <MDBBadge color='danger' pill>
                    De Active
                  </MDBBadge>}
                    options={hotelStatusOption}
                    onChange={(e) => {
                     setAvailable(e.value)
                    }}
                  />
                  <p>{error.category}</p>
                </div>
               
               
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

export default EditMenuItem;
