import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Select from "react-select";
import "./home.css"
import axios from 'axios';
import ConfigData from '../../config/config';
import { Button } from '@mui/material';
import EditRestaurant from  "../../pages/SuperAdmin/edit-restaurant"
const DefaultRestaurantDet={
  _id: 0,
 
  restaurantName: "",
  adminName: "",
  category: "",
  phone: "",
  email: "",
  password:""
}
const SuperAdminHome=()=>{

    const [restaurants,SetRestaurants] =useState([])
    const [openEdit,setOpenEdit]=useState(false)
    const [editDetails,setEditDetails]=useState(DefaultRestaurantDet)
    const [randomId,setRandomId]=useState(Date.now().toString());
    const HomeUrl= ConfigData.ServerAddress+"/superadmin"
    useEffect(()=>{
     
        axios.get(HomeUrl).then((response)=>{
        
          SetRestaurants(response.data)
        })
 
    },[openEdit])
    const ResetEditDetails=()=>{
setEditDetails(DefaultRestaurantDet)
setRandomId(Date.now().toString())
    }

const HandleOpenEdit=(editDetails)=>{
  
  setEditDetails(editDetails)
  setOpenEdit(true)
}
 const hotelStatusOption=[
  { value: "Active", label:   <MDBBadge color='success' pill>
  Active
</MDBBadge> },
  { value: "Deactive", label:   <MDBBadge color='danger' pill>
 De Active
</MDBBadge> },
   
 ]
  
  const ColumnsData= [
      {
          name:"Restaurant Name",
      } ,
      {
          name:"Admin Name",
      },
        {
          name:"Category",
      } ,
       {
          name:"Phone",
      } ,
       {
          name: "Email",
      },
        {
          name:  "Status",
      },
      {
        name:"Action",
      }
   
    
  ]
  
  
  const Columns={
      name:
     
      ColumnsData.map((e)=>{
          return(
          <th scope='col'>{e.name}</th>
          )
      })
      
  }
  const data={
  
      data:
      restaurants.map((e)=>{
          return(
          <tr>
          <td>
            <div className='d-flex align-items-center'>
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{e.restaurantName}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{e.adminName}</p>
       
          </td>
          <td>
           <p> {e.category}</p>
          </td>
          <td>
            <p>{e.phone}
            </p></td>
            <td>
            <p>{e.email}
            </p></td>
            <td>
            <Select placeholder={e.active?  <MDBBadge color='success' pill>
              Active
            </MDBBadge>:  <MDBBadge color='danger' pill>
              De Active
            </MDBBadge>}
                          options={hotelStatusOption}
                          
                        /></td>
                         <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "white",
                        padding: "3px 8px",
                        fontSize: "14px",
                        color: "black",
                      }}
                      variant="contained"
                      onClick={()=>HandleOpenEdit(e)}
                    >
                    Edit
                    </Button>
                    <Button
                      style={{
                        borderRadius: 5,
                        backgroundColor: "white",
                        padding: "3px 8px",
                        fontSize: "14px",
                        color: "black",
                      }}
                      variant="contained"
             
                    >
                   {e.restaurantName}
                    </Button>
                    
         </tr>
      )
      })
     }
  
  return (
    <>
    <div>
      <Button onClick={()=>{HandleOpenEdit(DefaultRestaurantDet)}} >
        Add New
      </Button>
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
            {Columns.name}
        </tr>
      </MDBTableHead>
      <MDBTableBody >
        {data.data}
        
      </MDBTableBody>
    </MDBTable>
    <EditRestaurant
    restaurantDetails={editDetails} 
    openEdit={openEdit}
    setOpenEdit={setOpenEdit}
    resetEdit={ResetEditDetails}
    randomId={randomId}
    
    /> 
    </div>
    </>
  );
  
}

export default SuperAdminHome;