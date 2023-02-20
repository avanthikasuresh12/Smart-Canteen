import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Select from "react-select";
import "./home.css"
import axios from 'axios';
import ConfigData from '../../config/config';
const SuperAdminHome=()=>{

    const [restaurants,SetRestaurants] =useState([])
    
    const HomeUrl= ConfigData.ServerAddress+"/superadmin"
    useEffect(()=>{
      console.log("hey")
        axios.get(HomeUrl).then((response)=>{
          console.log("response is "+response.data);
          SetRestaurants(response.data)
        })
    },[])

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
         </tr>
      )
      })
     }
  
  return (
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
  );
  
}

export default SuperAdminHome;