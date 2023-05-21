import React, { useEffect, useState } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import Select from "react-select";
import axios from "axios";
import ConfigData from "../../../config/config";
import { Button } from "@mui/material";
import EditCategory from "./edit-category";
import ViewCategory from "./view-category";
import { FaCut, FaEdit, FaReadme, FaTimes } from "react-icons/fa";
 
const DefaultCategoryDet = {
  _id: 0,
   name:"",
   description:""
  
};
const SuperAdminHome = () => {
  const [isAdmin,setisAdmin]=useState(false);
  const [categories, setCategories] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState(DefaultCategoryDet);
  const [viewDetails, setviewDetails] = useState(DefaultCategoryDet);
  const [randomId, setRandomId] = useState(Date.now().toString());
  const [changeDataId,setChangeDataId]=useState(0)
  const [openView,setOpenView]=useState(false)
  const AdminURL = ConfigData.ServerAddress + "/admin";

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(AdminURL+"/category-list",{withCredentials: true}).then((response) => {
      setCategories(response.data);
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
    setEditDetails(DefaultCategoryDet);
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
  
  const handleDelete = (id) => {
    axios.defaults.withCredentials = true;
    const delelteUrl = AdminURL + "/delete-category";
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
      name: "Category Name",
    },
    {
      name: "Description",
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
    data: categories.map((e) => {
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
            <p className="fw-normal mb-1">{e.description}</p>
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
       {isAdmin?
      <div>
        <Button
          onClick={() => {
            HandleOpenEdit( DefaultCategoryDet);
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
        <EditCategory
          categoryDetails={editDetails}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          resetEdit={ResetEditDetails}
          randomId={randomId}
          
        />  
        <ViewCategory
          CategoryDetails={viewDetails}
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
