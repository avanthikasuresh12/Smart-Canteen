import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
const ViewQR=(props)=>{
    var { url, openQR, setOpenQR } = props;

  return (
    <Dialog open={openQR} fullWidth maxWidth="sm">
    <DialogTitle>View Qr </DialogTitle>
    <DialogContent>    
  <div>
  
 <a><img src={url} width="500px" height="500px"></img></a>
            <Button onClick={()=>setOpenQR(false)}>Close</Button>
          </div>
  
</DialogContent>

</Dialog>
  );
 
}

export default ViewQR;