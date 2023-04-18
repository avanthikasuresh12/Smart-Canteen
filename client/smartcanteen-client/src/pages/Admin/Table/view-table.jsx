import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
const ViewTable=(props)=>{
    var { tableDetails, openView, setOpenView } = props;

  return (
    <Dialog open={openView} fullWidth maxWidth="sm">
    <DialogTitle>View Category</DialogTitle>
    <DialogContent>    
  <div>
    <p>  Table Number :<b>{tableDetails.number}</b></p>
   
  </div>
  
  <div>
    <p>  Seating Capacity :<b>{tableDetails.capacity}</b></p>
  
  </div>
 <div>
            <Button onClick={()=>setOpenView(false)}>Close</Button>
          </div>
  
</DialogContent>

</Dialog>
  );
 
}

export default ViewTable;