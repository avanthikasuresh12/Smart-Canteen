const express=require("express")
const router=express.Router();

 
router.post("/register-restaurantAdmin",   function (req, res, next) {
      console.log(req.body);
      res.send(req.body)
  });
  router.get("/",   function (req, res, next) {
    
});
module.exports=router;