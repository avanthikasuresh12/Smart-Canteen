var express= require("express")
var bodyParser=require("body-parser")
var cors =require("cors")
var db=require("./config/connection")
const userRoute=require("./routes/user")
const adminRoute=require("./routes/admin")
const superAdminRoute=require("./routes/superAdmin")
var app=express();

//database setup
db.connect((err)=>{
    if (err)
    console.log("Connection error"+err)
    else
   console.log("Database connected");
  })
 //middlewares

  //Body-Parser to JSON
  app.use(express.json())
  app.use(cors({
  
    origin: "http://localhost:3000",
    credentials:true,       
 
    optionSuccessStatus:200,
}))
  // Router setup middlewares
  app.options('*', cors()) //
  app.use("/",userRoute);
  app.use("/admin",adminRoute);
  app.use("/superadmin",superAdminRoute);


 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


 
  // server setup
app.listen(3002,()=>{
    console.log("Express started")
})