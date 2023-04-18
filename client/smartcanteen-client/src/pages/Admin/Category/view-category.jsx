import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
const ViewCategory=(props)=>{
    var { CategoryDetails, openView, setOpenView } = props;

  return (
    <Dialog open={openView} fullWidth maxWidth="sm">
    <DialogTitle>View Category</DialogTitle>
    <DialogContent>    
  <div>
    <p>  Name :<b>{CategoryDetails.name}</b></p>
   
  </div>
  
  <div>
    <p>  Description :<b>{CategoryDetails.description}</b></p>
  
  </div>
 <div>
            <Button onClick={()=>setOpenView(false)}>Close</Button>
          </div>
  
</DialogContent>

</Dialog>
  );
 
}

export default ViewCategory;