import  React ,{useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import ConfigData from '../../config/config';
import "../user/menu.css"
 
import axios from 'axios';
import { Button } from 'react-bootstrap';
const ViewQR=( )=>{
 const params=useParams();
 const [items,setItems]=useState([])
 localStorage.setItem("table",params.tableno)
 useEffect(()=>{
  axios.defaults.withCredentials = true;
    const MenulistURL=ConfigData.ServerAddress+"/menu-list";
    const restaurantURL=ConfigData.ServerAddress+"/admin/restaurant"
    axios
      .post(MenulistURL, {
   data:params,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, 
      }).then((res)=>{
        setItems(res.data)
      })
      axios.post(restaurantURL,{
        id:params.id,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }).then((res)=>{
        localStorage.setItem("restaurant",JSON.stringify(res.data))
      }) 

 },[])

 const addtoCart=async(proId,userId)=>{
  axios.defaults.withCredentials = true;
  const restaurantId=JSON.parse(localStorage.getItem("restaurant"))._id;
  const cartURL=ConfigData.ServerAddress+"/addto-cart"
  const cartData={
    proId:proId,
    userId:userId,
    restaurantId:restaurantId

   }
   
  await axios
    .post(cartURL, {
      cartData
   ,
    }) 
    .then((res) => {
      if (res.status == 200) {
        alert("Added to cart!")
      
      }
    });
 
 }
const handleCartAdd=(proID)=>{
 console.log(proID);
let user=localStorage.getItem("user")
user=JSON.parse(user)
 
if(user){
  const userId=user._id;
  addtoCart(proID,userId)
}else{
  window.location.href=ConfigData.originAddress+"/user_login"
}
}
  return (
   items.map((e)=>{
    let path=`/uploads/${e.imagePath}`
    path =path.toString();
    const tryRequire=(path)=>{
      try{
        return require(path)
      }catch(err){
        return null
      }
      
    }
 
    return(
<div  className="menu-div">
        <article key="" className="menu-item">
        <img src={path} alt="" className="photo" />
        <div className="item-info">
          <header>
            <h4>{e.name}</h4>
            <h4 className="price">{e.price} ₹</h4>
          </header>
          <p className="item-text">{e.description}</p>
          <Button variant='contained'  className='add-button' onClick={()=>handleCartAdd(e._id)}>
          Add
        </Button>
        </div>
      
      </article>
      </div>

    )
   })
       
     
     
  );
 
}

export default ViewQR;