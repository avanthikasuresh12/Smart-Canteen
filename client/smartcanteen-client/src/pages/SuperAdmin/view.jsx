import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
const ViewRestaurant=(props)=>{
    var { restaurantDetails, openView, setOpenView } = props;


 

 

 
  return (
    <Dialog open={openView} fullWidth maxWidth="sm">
    <DialogTitle>View Restaurant</DialogTitle>
    <DialogContent>    
  <div>
    <p>  Name :<b>{restaurantDetails.restaurantName}</b></p>
   
  </div>
  
  <div>
    <p>  Admin Name :<b>{restaurantDetails.adminName}</b></p>
  
  </div>

  <div>
    <p>  Category : <b>{restaurantDetails.category}</b></p>
   
  </div>

  <div>
    <p>
  Email :<b>  {restaurantDetails.email}</b></p>
  </div>

  <div>
    <p>
  Phone: <b> {restaurantDetails.phone}</b></p>
  </div>

  <div>
    <p>  Status : <b>  {restaurantDetails.active?"Active":"Not Active"}</b></p>
 
  </div>
  <div>
            <Button onClick={()=>setOpenView(false)}>Close</Button>
          </div>
  
</DialogContent>

</Dialog>
  );
 
}

export default ViewRestaurant;