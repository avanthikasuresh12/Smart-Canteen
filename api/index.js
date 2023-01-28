var express= require("express")
var db=require("./config/connection")
var app=express();
db.connect((err)=>{
    if (err)
    console.log("Connection error"+err)
    else
   console.log("Database connected");
  })

  // Router setup

  app.get("/",(req,res)=>{
    res.send("Started")
  })
app.listen(3001,()=>{
    console.log("Express started")
})