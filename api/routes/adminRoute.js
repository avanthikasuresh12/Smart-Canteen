const express= require("express")


const router=express.Router();


router.get("/",(req,res)=>{
    res.send("admin")
})

router.get("/login",(req,res)=>{
    res.send("Something")
})

module.exports=router