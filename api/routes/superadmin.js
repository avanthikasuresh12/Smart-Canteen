const express=require("express")
const router=express.Router();
const superAdminHelpers=require("../helpers/superadminHelpers")
 
router.post("/register-restaurantAdmin",  async  function  (req, res, next) {
      
  await superAdminHelpers.registerRestaurantAdmin(req.body.body);
  });
  router.get("/",   function (req, res, next) {
    
});
module.exports=router;