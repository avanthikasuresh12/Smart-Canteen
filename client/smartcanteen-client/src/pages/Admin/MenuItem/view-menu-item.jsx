import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
const ViewMenuItem=(props)=>{
    var { menuDetails, openView, setOpenView } = props;

  return (
    <Dialog open={openView} fullWidth maxWidth="sm">
    <DialogTitle>View Item</DialogTitle>
    <DialogContent>    
  <div>
    <p>  Name :<b>{menuDetails.name}</b></p>
   
  </div>
  
  <div>
    <p>  Category :<b>{menuDetails.category}</b></p>
  
  </div>
  <div>
    <p>  Description :<b>{menuDetails.description}</b></p>
  
  </div>
  <div>
    <p>  Price :<b>{menuDetails.price} rs</b></p>
  
  </div>
  <div>
    <p>  Offer :<b>{menuDetails.offer} %</b></p>
  
  </div>
  <div>
    <p>  Actual Price :<b> {menuDetails.price-(menuDetails.offer/100)*menuDetails.price} rs</b></p>
  
  </div>
 
  <div>
    <p>  Available :<b>{menuDetails.available}</b></p>
  
  </div>
 <div>
            <Button onClick={()=>setOpenView(false)}>Close</Button>
          </div>
  
</DialogContent>

</Dialog>
  );
 
}

export default ViewMenuItem;