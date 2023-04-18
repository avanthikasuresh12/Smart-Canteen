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
 
import { MDBBadge } from "mdb-react-ui-kit";
import ConfigData from "../../../config/config";
const EditCategory = (props) => {
  
  var {categoryDetails, openEdit, setOpenEdit, resetEdit, randomId } = props;
  const [name, setName] = useState(categoryDetails.name);
  const [description, setDescription] = useState(categoryDetails.description);
  const [id,setId]=useState(categoryDetails._id)
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
    setName(categoryDetails.name);
    setDescription(categoryDetails.description);
    setId(categoryDetails._id)
  }, [categoryDetails, randomId]);
  const HandleClose = () => {
    setOpenEdit(false);
    setError("");
    resetEdit();
  };
  const categoryAddURL = ConfigData.ServerAddress + "/admin/addoredit-category";

  const onSubmit = (e) => {
 
    e.preventDefault();
    const registerDetails = {
      id: id,
      name: name,
      description: description,
    };
  
    setRegisterationDetails(registerDetails);
    setError(validateDetails(registerDetails));
    setisSubmit(true);
    setCheckError();
  };
 
  const registerUser = async (registerData) => {
    axios.defaults.withCredentials = true;
    await axios
      .post(categoryAddURL, {
     registerData,
      }) 
      .then((res) => {
        if (res.status == 200) {
          
          HandleClose();
        }
      });
  };
  

  const validateDetails = (data) => {
    
    var error = {};
    if (!data.name) {
      error.name = "Category name required !!";
    }
    if (!data.description) {
      error.description = "Description required !!";
    }
  

    return error;
  };
  return (
    <Dialog open={openEdit} fullWidth maxWidth="sm">
      <DialogTitle>
        <div>{categoryDetails.name}</div>
      </DialogTitle>
      <DialogContent>
        <div>
          <form onSubmit={onSubmit}>
          <Grid container spacing={6}>
            <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
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
                <p>{error.description}</p>
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

export default EditCategory;
