import React, { useState } from "react";
 import Select from 'react-select'
 import axios from "axios";
import {
   
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
 import "./RegisterHotel.css"
 import { Button } from "@mui/material";
import { color } from "@mui/system";

const RegisterHotel=()=>{
  //usestate 
  const [RestaurantName, setRestaurantName] = useState("");
  const [adminName,setAdminName]=useState("");
  const [category,setCategory]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail] =useState("");
  const [Password,setPassword]=useState("");
   const [street,setStreet]=useState("");
     const [zipCode,setZipCode]=useState("");
   const [state,setState]=useState("");
  const [country,setCountry]=useState("");
  const [district,setDistrict]=useState("");
  const [agreed,setAgreed] =useState("")

  
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const HandleCateogoryChange=(e)=>{
  setCategory(e.value)
}
 const handleSubmit=(e)=>{

  e.preventDefault()
  const registerDetails={
    restaurantName: RestaurantName,
    adminName:adminName,
    category:category,
    phone:phone,
    email:email,
    password:Password,
    street:street,
    district:district,
    zipCode:zipCode,
    state:state,
    country:country,
  }
  registerUser(registerDetails)
 }

 // sending data to the back
const RegisterURL="http://localhost:3002/superadmin/Register-RestaurantAdmin"
 const registerUser=(registerData)=>{
       axios
      .post(RegisterURL, {
        title: "Hello World!",
        body:registerData
      })
      .then((response) => {
      console.log(response)
      });
  
 }
    return(
      <form onSubmit={handleSubmit }>
      <MDBContainer fluid className='h-custom'>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12' className='m-5'>

          <MDBCard className='card-registration card-registration-2' style={{borderRadius: '15px'}}>

            <MDBCardBody className='p-0'>

              <MDBRow>

                <MDBCol md='6' className='p-5 bg-white'>

                  <h3 className="fw-normal mb-5" style={{color: '#4835d4'}}>Hotel Infomation</h3>
              
{/* //FisrtName Section */}
                  <MDBRow>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Restaurant Name' size='lg' id='form1' type='text'value={RestaurantName} 
                      
                      onChange={(e)=>{
                        setRestaurantName(e.target.value)
                      }}/>
{/* 
                      last name section */}
                    </MDBCol>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mb-4' label='Restaurant Admin Name' size='lg' id='form2' type='text' value={adminName}
                      onChange={(e)=>{
                        setAdminName(e.target.value)
                      }}
                      />
                    </MDBCol>

                  </MDBRow>

                   <MDBRow md="6">
                    <MDBCol>
                     
                    <Select options={options} 
                
                    onChange= {(e)=>{
                      HandleCateogoryChange(e)
                      
                    }}
                     />
                    <span>
                        Category
                      </span>
                    </MDBCol>
                   </MDBRow>
  
                

                  <MDBRow>

                    <MDBCol md='6'>
                      <MDBInput wrapperClass='mt-4' label='Phone Number' size='lg' id='form4' type='text' 
                      value={phone}
                      onChange={(e)=>{
                        setPhone(e.target.value)
                      }}/>
                    </MDBCol>
                 
<MDBCol md='6'>
  <MDBInput wrapperClass='mt-4' label='Email ' size='lg' id='form4' type='Email'
  value={email}
  onChange={(e)=>{
    setEmail(e.target.value)
  }}/>
</MDBCol>
                       






</MDBRow>
<MDBRow>
<MDBCol md='6'>
  <MDBInput wrapperClass='mt-4' label='Password ' size='lg' id='form4' type='password'
  value={Password}
  onChange={(e)=>{
    setPassword(e.target.value)
  }}/>
</MDBCol>



</MDBRow>
                </MDBCol>


                <MDBCol md='6' className='bg-indigo p-5'>

                  <h3 className="fw-normal mb-5 text-white" style={{color: '#4835d4'}}>Address Details</h3>
                  <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Street + Nr' size='lg' id='form5' type='text'
                  value={street}
                  onChange={(e)=>{
                    setStreet(e.target.value)
                  }}/>
                 
                  <MDBRow>

                    <MDBCol md='5'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' label='District' size='lg' id='form6' type='text'
                      value={district}
                      onChange={(e)=>{
                        setDistrict(e.target.value)
                      }}
                      />
                    </MDBCol>

                    <MDBCol md='7'>
                      <MDBInput wrapperClass='mb-4' labelClass='text-white' label='State' size='lg' id='form7' type='text'
                      value={state}
                      onChange={(e)=>{
                        setState(e.target.value)
                      }}
                      />
                    </MDBCol>

                  </MDBRow>

                  <MDBInput wrapperClass='mb-4' labelClass='text-white' label='Country' size='lg' id='form8' type='text'
                  value={country}
                  onChange={(e)=>{
                    setCountry(e.target.value)
                  }}
                  />

<MDBRow>
<MDBCol md='6'>
  <MDBInput  wrapperClass='mb-4' labelClass='text-white' label='Zip Code' size='lg' id='form8' type='text'
  value={zipCode}
  onChange={(e)=>{
    setZipCode(e.target.value)
  }}/>
</MDBCol>



</MDBRow>

                  
                  <MDBCheckbox name='flexCheck' id='flexCheckDefault' labelClass='text-white mb-4' label='I do accept the Terms and Conditions of your site.'
                 value={agreed}
                 onChange={(e)=>{
                    setAgreed(e.target.value)
                  }} />
                  <Button style={{
        borderRadius: 10,
        backgroundColor: "white",
        padding: "13px 28px",
        fontSize: "14px",
        color: 'black'
    }} variant="contained"  id="submitbutton" type="submit"  > Register </Button>

                </MDBCol>
              </MDBRow>

            </MDBCardBody>

          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </form>
    )
}

export default RegisterHotel;