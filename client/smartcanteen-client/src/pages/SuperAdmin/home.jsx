import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Select from "react-select";
import "./home.css";
import axios from "axios";
import ConfigData from "../../config/config";
import { Button } from "@mui/material";
import EditRestaurant from "./edit-restaurant";
import ViewRestaurant from "./view";
import { FaEdit, FaReadme, FaTimes } from "react-icons/fa";
const DefaultRestaurantDet = {
  _id: 0,

  restaurantName: "",
  adminName: "",
  category: "",
  phone: "",
  email: "",
  password: "",
  city:"",
  district:"",
  state:"",
  
};
const SuperAdminHome = () => {
  const [isSuperAdmin,setisSuperAdmin]=useState(false);
  const [restaurants, SetRestaurants] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState(DefaultRestaurantDet);
  const [viewDetails, setviewDetails] = useState(DefaultRestaurantDet);
  const [randomId, setRandomId] = useState(Date.now().toString());
  const [changeDataId,setChangeDataId]=useState(0)
  const [openView,setOpenView]=useState(false)
  const HomeUrl = ConfigData.ServerAddress + "/superadmin";

  useEffect(() => {
    
    axios.get(HomeUrl,{withCredentials: true}).then((response) => {
      SetRestaurants(response.data);
    });
  }, [changeDataId]);
  useEffect(()=>{
    let user= localStorage.getItem("user")
    user=JSON.parse(user)
if(user.role=="superAdmin"){
  setisSuperAdmin(true)
}else{
  setisSuperAdmin(false)
}
  },[])
  const ResetEditDetails = () => {
    setEditDetails(DefaultRestaurantDet);
    setRandomId(Date.now().toString());
    setChangeDataId(Date.now().toString());
  };

  const HandleOpenEdit = (editDetails) => {
    setEditDetails(editDetails);
    setOpenEdit(true);
  };
  const HandleOpenView = (viewDet) => {
    setviewDetails(viewDet);
    setOpenView(true);
  };
  const  handleStatusChange=(id,status)=>{
 const statusEditURL=HomeUrl+"/change-status";
 axios.defaults.withCredentials=true;
 axios
 .post(statusEditURL, {
   id: id,
   status:status,
 })

  }
  const handleDelete = (id) => {
    
    const delelteUrl = HomeUrl + "/delete";
    axios
      .post(delelteUrl, {
        id: id,
      })
      .then((res) => {
        if (res.status == 200) {
          setChangeDataId(Date.now().toString())
        }
      });
  };
  const hotelStatusOption = [
    {
      value: true,
      label: (
        <MDBBadge color="success" pill>
          Active
        </MDBBadge>
      ),
    },
    {
      value:false,
      label: (
        <MDBBadge color="danger" pill>
          De Active
        </MDBBadge>
      ),
    },
  ];

  const ColumnsData = [
    {
      name: "Restaurant Name",
    },
    {
      name: "Admin Name",
    },
    {
      name: "Category",
    },
    {
      name: "Phone",
    },
    {
      name: "Email",
    },
    {
      name: "Status",
    },
    {
      name: "Action",
    },
  ];

  const Columns = {
    name: ColumnsData.map((e) => {
      return <th scope="col">{e.name}</th>;
    }),
  };
  const data = {
    data: restaurants.map((e) => {
      return (
     
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{e.restaurantName}</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">{e.adminName}</p>
          </td>
          <td>
            <p> {e.category}</p>
          </td>
          <td>
            <p>{e.phone}</p>
          </td>
          <td>
            <p>{e.email}</p>
          </td>
          <td>
            <Select
              placeholder={
                e.active ? (
                  <MDBBadge color="success" pill>
                    Active
                  </MDBBadge>
                ) : (
                  <MDBBadge color="danger" pill>
                    De Active
                  </MDBBadge>
                )
              }
              options={hotelStatusOption}
              onChange={(status)=>handleStatusChange(e._id,status.value)}
            />
          </td>
          <Button
            style={{
              borderRadius: 5,
              backgroundColor: "white",
              padding: "3px 8px",
              fontSize: "14px",
              color: "black",
            }}
            variant="contained"
            onClick={() => HandleOpenEdit(e)}
          >
          <FaEdit/>
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
            onClick={()=>HandleOpenView(e)}
          >
         <FaReadme/>
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
            onClick={() => handleDelete(e._id)}
          >
           <FaTimes/>
          </Button>
        </tr>
      );
    }),
  };

  return (
    <>
       {isSuperAdmin?
      <div>
        <Button
          onClick={() => {
            HandleOpenEdit(DefaultRestaurantDet);
          }}
        >
          Add New
        </Button>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>{Columns.name}</tr>
          </MDBTableHead>
          <MDBTableBody>{data.data}</MDBTableBody>
        </MDBTable>
        <EditRestaurant
          restaurantDetails={editDetails}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          resetEdit={ResetEditDetails}
          randomId={randomId}
          
        />
        <ViewRestaurant
          restaurantDetails={viewDetails}
          openView={openView}
          setOpenView={setOpenView}
          resetEdit={ResetEditDetails}
          />
      </div>:<div>

        You dont have acces to this page
        
        </div>}
    </>
  );
};

export default SuperAdminHome;
