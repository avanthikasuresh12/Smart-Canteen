var express= require("express")
var db=require("./config/connection")
const userRoute=require("./routes/userRoute")
const adminRoute=require("./routes/adminRoute")
const superAdminRoute=require("./routes/superAdminRoute")
var bodyParser = require('body-parser');
var app=express();

//database setup
db.connect((err)=>{
    if (err)
    console.log("Connection error"+err)
    else
   console.log("Database connected");
  })

  // Router setup middlewares
 
  
 

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use("/",userRoute);
  app.use("/admin",adminRoute);
  app.use("/superadmin",superAdminRoute)


  // server setup
app.listen(3001,()=>{
    console.log("Express started")
})