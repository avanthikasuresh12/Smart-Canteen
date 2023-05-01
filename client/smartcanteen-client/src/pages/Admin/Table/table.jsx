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
import EditTable from "./edit-table";
import ViewTable from "./view-table";
 import ViewQR from "./view-qr";
 
const defaultTableDetails = {
  _id: 0,
  number:0,
  capacity:0,
};
const Table = () => {
  const [isAdmin,setisAdmin]=useState(false);
  const [tables, setTables] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editDetails, setEditDetails] = useState(defaultTableDetails);
  const [viewDetails, setviewDetails] = useState(defaultTableDetails);
  const [randomId, setRandomId] = useState(Date.now().toString());
  const [changeDataId,setChangeDataId]=useState(0)
  const [openView,setOpenView]=useState(false)
  const [url,setURL]=useState("")
  const [openQR,setOpenQR]=useState(false)
  const AdminURL = ConfigData.ServerAddress + "/admin";
  
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(AdminURL+"/table-list",{withCredentials: true}).then((response) => {
        console.log("somthing");

console.log(response.data);        setTables(response.data);
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
    setEditDetails(defaultTableDetails);
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
  const generateQRCode=(number)=>{
    
    const qrcodeURL=AdminURL+"/qrcode"
    axios
    .post(qrcodeURL, {
      url: ConfigData.originAddress,
      number:number,
    }).then((response)=>{
      setURL(response.data)
      setOpenQR(true)
    })
  }
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
      name: "Table Number",
    },
    {
      name: "Seating Capacity",
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
    data: tables.map((e) => {
      return (
     
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{e.number}</p>
              </div>
            </div>
          </td>
          <td>
            <p className="fw-normal mb-1">{e.capacity}</p>
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
            onClick={() => generateQRCode(e.number)}
          >
            QR Code
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
            HandleOpenEdit( defaultTableDetails);
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
       <EditTable
          tableDetails={editDetails}
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          resetEdit={ResetEditDetails}
          randomId={randomId}
          
        />  
         
        <ViewTable
          tableDetails={viewDetails}
          openView={openView}
          setOpenView={setOpenView}
          resetEdit={ResetEditDetails}
          />   
            <ViewQR
          url={url}
          openQR={openQR}
          setOpenQR={setOpenQR}
          />    
      </div>:<div>

        You dont have acces to this page
        
        </div>}
    </>
  );
};

export default Table;
