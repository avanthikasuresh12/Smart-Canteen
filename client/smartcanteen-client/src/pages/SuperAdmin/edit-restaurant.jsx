import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Grid version 1
const EditRestaurant = (props) => {
  const { title, restaurantDetails, openEdit, setOpenEdit } = props;
  const [restaurantName, SetRestaurantName] = useState(
    restaurantDetails.restaurantName
  );
  const [adminName, setAdminName] = useState(restaurantDetails.adminName);
  const [category, setCategory] = useState(restaurantDetails.category);
  const [phone, setPhone] = useState(restaurantDetails.phone);
  const [email, setEmail] = useState(restaurantDetails.email);
  const [status, setStatus] = useState(restaurantDetails.status);
  const [id,setId]=useState(restaurantDetails._id)
  const [registerationDetails, setRegisterationDetails] = useState("");
  const onSubmit=(e)=>{
    e.preventDefault();
    const registerDetails = {
      id:id,
      restaurantName: restaurantName,
      adminName: adminName,
      category: category,
      phone: phone,
      email: email,

       
    };
    console.log(registerDetails)
    setRegisterationDetails(registerDetails);
   
    
  }
  return (
    <Dialog open={openEdit}>
      <DialogTitle>
        <div>Something</div>
      </DialogTitle>
      <DialogContent>
        <div>
          <form onSubmit={onSubmit}>          <Grid container spacing={6}>
            <Grid item s={2}>
              <TextField
                id="outlined-basic"
                label="Restuarant Name"
                value={restaurantName}
                onChange={(e) => SetRestaurantName(e.target.value)}
                style={{ paddingBottom: "20px" }}
              />
            </Grid>
            <Grid item s={2}>
              <TextField
                id="outlined-basic"
                label="Admin Name"
                variant="outlined"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                style={{ paddingBottom: "20px" }}
              />
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
            </Grid>
          </Grid>
          <div>
<Button       type="submit">Close</Button>
</div>
          </form>

          <div>
            <Button onClick={() => setOpenEdit(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRestaurant;
