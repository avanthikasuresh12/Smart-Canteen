import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./profile.css";
import { Button } from "react-bootstrap";
import EditProfile from "./edit-profile";
import axios from "axios";
import ConfigData from "../../config/config";
export default function AdminProfile() {
 
  const [isAdmin, setIsAdmin] = useState(false);
  const [restaurant, SetRestaurant] = useState({});
const [openEdit,setOpenEdit]=useState(false)
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
   const userId= user._id;
    if (user.role == "admin") {
      setIsAdmin(true);
      console.log(user);
      const ProfileURL=ConfigData.ServerAddress+"/admin/restaurant"
       axios
      .post(ProfileURL, {
        id: userId,
      }).then((response)=>{
        SetRestaurant(response.data)
      })
    } else {
      setIsAdmin(false);
    }
  }, []);
  const handleEdit=()=>{
setOpenEdit(true)
  }

  return (
    <>
      {!isAdmin ? (
        <div>you have no acces to this page</div>
      ) : (
        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="12" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white align-items-center"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <MDBTypography tag="h5">
                      {restaurant.restaurantName}
                    </MDBTypography>
                    <MDBCardText>{restaurant.category}</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="12">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Email</MDBTypography>
                          <MDBCardText className="text-muted">
                            {restaurant.email}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Phone</MDBTypography>
                          <MDBCardText className="text-muted">
                            {restaurant.phone}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>

                      <MDBRow className="pt-1">
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">Admin Name</MDBTypography>
                          <MDBCardText className="text-muted">
                            {restaurant.adminName}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">City</MDBTypography>
                          <MDBCardText className="text-muted">
                           {restaurant.city}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">District</MDBTypography>
                          <MDBCardText className="text-muted">
                           {restaurant.district}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol size="6" className="mb-3">
                          <MDBTypography tag="h6">State</MDBTypography>
                          <MDBCardText className="text-muted">
                           {restaurant.state}
                          </MDBCardText>
                        </MDBCol>

                        <Button className="mt-5" onClick={handleEdit}>Edit info</Button>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          <EditProfile
          restaurantDetails={restaurant}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
        />
        </section>
      )}
    </>
  );
}
