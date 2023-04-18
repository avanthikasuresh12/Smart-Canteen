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
 
import { MDBBadge } from "mdb-react-ui-kit";
import ConfigData from "../../../config/config";
const EditTabl = (props) => {
  
  var {tableDetails, openEdit, setOpenEdit, resetEdit, randomId } = props;
  const [number, setNumber] = useState(tableDetails.number);
  const [capacity, setCapacity] = useState(tableDetails.capacity);
  const [id,setId]=useState(tableDetails._id)
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
    setNumber(tableDetails.number);
    setCapacity(tableDetails.capacity);
    setId(tableDetails._id)
  }, [tableDetails, randomId]);
  const HandleClose = () => {
    setOpenEdit(false);
    setError("");
    resetEdit();
  };
  const tableAddURL = ConfigData.ServerAddress + "/admin/addoredit-table";

  const onSubmit = (e) => {
 
    e.preventDefault();
    const registerDetails = {
      id: id,
      number: number,
      capacity: capacity,
    };
  
    setRegisterationDetails(registerDetails);
    setError(validateDetails(registerDetails));
    setisSubmit(true);
    setCheckError();
  };
 
  const registerUser = async (registerData) => {
    axios.defaults.withCredentials = true;
    await axios
      .post(tableAddURL, {
     data:registerData
      }) 
      .then((res) => {
        if (res.status == 200) {
          
          HandleClose();
        }
      });
  };
  

  const validateDetails = (data) => {
    
    var error = {};
    if (!data.number) {
      error.number = " Table number required !!";
    }
    if (!data.capacity) {
      error.capacity = "capacity required !!";
    }
  

    return error;
  };
  return (
    <Dialog open={openEdit} fullWidth maxWidth="sm">
      <DialogTitle>
        <div>{tableDetails.number}</div>
      </DialogTitle>
      <DialogContent>
        <div>
          <form onSubmit={onSubmit}>
          <Grid container spacing={6}>
            <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="number"
                  variant="outlined"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                />
                <p>{error.number}</p>
                
              </Grid>
              <Grid item s={2}>
                <TextField
                  id="outlined-basic"
                  label="Capacity"
                  variant="outlined"
                placeholder="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  style={{ paddingBottom: "20px" }}
                 
                  
                />
                <p>{error.capacity}</p>
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

export default EditTabl;
