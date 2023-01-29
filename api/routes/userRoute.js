const express= require("express")

const userHelper=require("../helpers/userHelpers")
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("User")
})
router.get("/login",(req,res)=>{
    res.send("login")
})


///user details page 


router.get("/signup",(req,res)=>{
 
})


//user details adding

router.post("/signup",async(req,res)=>{

var data =req.body;
console.log(data);
await userHelper.signUp(data)

})
module.exports=router