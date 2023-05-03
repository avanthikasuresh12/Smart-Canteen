import  React ,{useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import ConfigData from '../../config/config';
import "../user/menu.css"
 
import axios from 'axios';
import { Button } from 'react-bootstrap';
const ViewQR=( )=>{
 const params=useParams();
 const [items,setItems]=useState([])
 localStorage.setItem("restaurant",params.id)
 localStorage.setItem("table",params.tableno)
 useEffect(()=>{
  axios.defaults.withCredentials = true;
    const MenulistURL=ConfigData.ServerAddress+"/menu-list";
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

 },[])

 const addtoCart=async(proId,userId)=>{
  axios.defaults.withCredentials = true;
  const cartURL=ConfigData.ServerAddress+"/addto-cart"
  const cartData={
    proId:proId,
    userId:userId
   }
   
  await axios
    .post(cartURL, {
      cartData
   ,
    }) 
    .then((res) => {
      if (res.status == 200) {
        
      
      }
    });
 
 }
const handleCartAdd=(proID)=>{
 console.log(proID);
let user=localStorage.getItem("user")
user=JSON.parse(user)
alert(user._id)
if(user){
  const userId=user._id;
  addtoCart(proID,userId)
}else{
  window.location.href=ConfigData.originAddress+"/user_login"
}
}
  return (
   items.map((e)=>{
    const defaultPath=require(`../../uploads/image.png`)
    const path=`../../uploads/${e.imagePath}`
    const tryRequire=(path)=>{
      try{
        return require(path)
      }catch(err){
        return null
      }
      
    }
    const imagePath=tryRequire(path)?tryRequire(path).default:defaultPath;
    return(
<div  className="menu-div">
        <article key="" className="menu-item">
        <img src={imagePath} alt="" className="photo" />
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