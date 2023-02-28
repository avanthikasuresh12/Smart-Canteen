import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Grid version 1
const EditRestaurant = (props) => {
  const { title, children, openEdit, setOpenEdit } = props;
 
  return (
    <Dialog open={openEdit}>
      <DialogTitle>
        <div>Something</div>
      </DialogTitle>
      <DialogContent>
        
        <Grid container spacing={6}>
          <Grid item s={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              style={{paddingBottom: "20px", }}
            />
          </Grid>
          <Grid item s={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              style={{paddingBottom: "20px", }}
           
            />
          </Grid>
        </Grid>
        
        <Grid container spacing={6}>
          <Grid item s={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid item s={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
           
            />
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item s={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Grid>
          <Grid item s={2}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
           
            />
          </Grid>
        </Grid>
        <div>
          <Button
             onClick={ ()=> setOpenEdit(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditRestaurant;
