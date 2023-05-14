import * as React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { Button, Container } from 'react-bootstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
const ViewOrders=(props)=>{
    var { productDetails, openView, setOpenView } = props;
    const ColumnsData = [
        {
          name: "Name",
        },
        
        {
            name:"Quantity"
        },
       
      ];
      const Columns = {
        name: ColumnsData.map((e) => {
          return <th scope="col">{e.name}</th>;
        }),
      };
      const data = {
        data: productDetails.map((e) => {
          return (
         
            <tr>
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{e.products.name}</p>
                  </div>
                </div>
              </td>
           
              <td>
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{e.quantity}</p>
                  </div>
                </div>
              </td>
          
            </tr>
          );
        }),
      };
  return (

    <Dialog open={openView} fullWidth maxWidth="sm">
    <DialogTitle>View Orders</DialogTitle>
    <DialogContent>    
        {console.log("hey")}
    <Container>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>{Columns.name}</tr>
          </MDBTableHead>
          <MDBTableBody>{data.data}</MDBTableBody>
        </MDBTable> 
  
        </Container>
 
 <div>
            <Button onClick={()=>setOpenView(false)}>Close</Button>
          </div>
  
</DialogContent>

</Dialog>
  );
 
}
export default ViewOrders;