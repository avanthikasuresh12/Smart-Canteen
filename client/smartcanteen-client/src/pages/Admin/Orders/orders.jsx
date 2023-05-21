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
import { Button, Container } from "react-bootstrap";
import ViewOrders from "./viewOrders";
 
import Select from "react-select";
import { FaReadme } from "react-icons/fa";
 
 
 
const AdminOrders = () => {
  const [isAdmin,setisAdmin]=useState(false);
  const [randomId, setRandomId] = useState(Date.now().toString());
  const [changeDataId,setChangeDataId]=useState(0)
  const [openView,setOpenView]=useState(false)
  const [orders,setOrders]=useState([])
  const [productDetails, setProductDetails]=useState([])
  useEffect(() => {
    axios.defaults.withCredentials = true;
    const adminOrderURL=ConfigData.ServerAddress+"/admin/order"
axios.get(adminOrderURL).then((res)=>{
    setOrders(res.data)
})
  }, [changeDataId]);
  useEffect(()=>{
    let user= localStorage.getItem("user")
    user=JSON.parse(user)
    if(user){
      if(user.role=="admin"){
        setisAdmin(true)
      }else{
        setisAdmin(false)
      }
    } 

  },[])
 

  const OnViewBottonClick=(products)=>{
    console.log(products);
    setProductDetails(products)
    setOpenView(true)
  }
 
  
 
  
  
  const handleStatusChange=async (id,status)=>{
    axios.defaults.withCredentials = true;
    const data={
      id:id,status:status
    }
    console.log(data);
    const orderStatusUpdateURL=ConfigData.ServerAddress+"/admin/update-order"
      await axios
      .post(orderStatusUpdateURL, {
     data
      })
  }

  const ColumnsData = [
    {
      name: "Table Number",
    },
    {
      name:" "
    },
    {
        name:"Status"
    },
   
  ];
  const OrderStatusOption = [
    {
      value: "Pending",
      label:  "Pending"
    },
    {
      value:"Accepted",
      label:  "Accepted"
    },
   
    {
      value:"Delivered",
      label:"Delivered"
    },
  ];
  const Columns = {
    name: ColumnsData.map((e) => {
      return <th scope="col">{e.name}</th>;
    }),
  };
  const data = {
    data: orders.map((e) => {
      return (
     
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
                <p className="fw-bold mb-1">{e.tableNO}</p>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <div className="ms-3">
               <Button onClick={()=>OnViewBottonClick(e.products)}>
                <FaReadme/>
               </Button>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex align-items-center">
            <Select
              placeholder={
             e.status
              }
              options={OrderStatusOption}
              
      onChange={(status)=>handleStatusChange(e._id,status.value)}
            />
            </div>
          </td>
      
        </tr>
      );
    }),
  };

  return (
    <>
       {isAdmin?
     
      <div>
     
     <Container>
        <MDBTable align="middle">
          <MDBTableHead>
            <tr>{Columns.name}</tr>
          </MDBTableHead>
          <MDBTableBody>{data.data}</MDBTableBody>
        </MDBTable> 
  
        </Container>
        <ViewOrders
          productDetails={productDetails}
          openView={openView}
          setOpenView={setOpenView}
        
          /> 
      </div>:<div>

        You dont have acces to this page
        
        </div>}
    </>
  );
};

export default AdminOrders;
