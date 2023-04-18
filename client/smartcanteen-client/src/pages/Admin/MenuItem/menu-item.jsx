import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import ConfigData from "../../../config/config";
import { Button } from "@mui/material";
import EditMenuItem from "./edit-menu-item";
import ViewMenuItem from "./view-menu-item";
// import EditCategory from "./edit-category";
// import ViewCategory from "./view-category";
 
const defaultMenuDet = {
  _id: 0,
   name:"",
   description:"",
   Category:"",
   price:0,
   offer:0,
   available:true,
   
  
};
const MenuItem = () => {
  const [isAdmin,setisAdmin]=useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState(defaultMenuDet);
  const [viewDetails, setviewDetails] = useState(defaultMenuDet);
  const [randomId, setRandomId] = useState(Date.now().toString());
  const [changeDataId,setChangeDataId]=useState(0)
  const [openView,setOpenView]=useState(false)
  const AdminURL = ConfigData.ServerAddress + "/admin";

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(AdminURL+"/menu-items-list",{withCredentials: true}).then((response) => {
      setMenuItems(response.data);
    });
  }, [changeDataId]);
  useEffect(()=>{
    let user= localStorage.getItem("user")
    user=JSON.parse(user)
if(user.role=="admin"){
  setisAdmin(true)
}else{
  setisAdmin(false)
}
  },[])
  const ResetEditDetails = () => {
    setEditDetails(defaultMenuDet);
    setRandomId(Date.now().toString());
    setChangeDataId(Date.now().toString());
  };

  const HandleOpenEdit = (editDetails) => {
    setEditDetails(editDetails);
    setOpenEdit(true);
    console.log("open");
  };
  const HandleOpenView = (viewDet) => {
    setviewDetails(viewDet);
    setOpenView(true);
  };
  
  const handleDelete = (id) => {
    axios.defaults.withCredentials = true;
    const delelteUrl = AdminURL + "/delete-menuitem";
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
  

  const ColumnsData = [
    {
      name: "Item Name",
    },
    {
        name:"Category"
    },
    {
      name: "Description",
    },
    
    {
      name: "Price",
    },
    {
        name: "Offer",
      },
      {
name:"Current Price"
      },
      {
        name: "Available",
      },
      {
        name:"Action"
      }
  ];

  const Columns = {
    name: ColumnsData.map((e) => {
      return <th scope="col">{e.name}</th>;
    }),
  };
  const data = {
    data: menuItems.map((e) => {
      return (
     
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{e.name}</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">{e.Category}</p>
          </td>
          <td>
            <textarea readOnly
          className="fw-normal mb-1">{e.description}</textarea>
          </td>
          <td>
            <p className="fw-normal mb-1">{e.price} rs</p>
          </td>

          <td>
            <p className="fw-normal mb-1">{e.offer} %</p>
          </td>
          <td>
            <p className="fw-normal mb-1">{e.price-(e.offer/100)*e.price} rs</p>
          </td>
          
          <td>
            <p className="fw-normal mb-1">{e.available}</p>
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
            onClick={()=>HandleOpenView(e)}
          >
            view
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
            Delete
          </Button>
        </tr>
      );
    }),
  };

  return (
    <>
       {isAdmin?
      <div>
        <Button
          onClick={() => {
            HandleOpenEdit(defaultMenuDet);
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
       <EditMenuItem
          menuDetails={editDetails}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          resetEdit={ResetEditDetails}
          randomId={randomId}
        />  
          
        <ViewMenuItem
          menuDetails={viewDetails}
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

export default MenuItem;
