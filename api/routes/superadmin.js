const { response } = require("express");
const express=require("express")
const router=express.Router();
const superAdminHelpers=require("../helpers/superadminHelpers")
 
router.post("/register-restaurantAdmin",  async  function  (req, res ) {
      
  let data=req.body;
  await superAdminHelpers.registerRestaurantAdmin(data.body).then((response)=>{
    res.send(response)
     
  });
 
  });
  

router.get("/",async (req,res)=>{

  await superAdminHelpers.getAllRestaurants().then((restaurantData)=>{
    console.log(restaurantData);
    res.send(restaurantData)
  })
})
module.exports=router;