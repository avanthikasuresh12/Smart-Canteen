var express= require("express")
var bodyParser=require("body-parser")
var cors =require("cors")
var db=require("./config/connection")
const userRoute=require("./routes/user")
const adminRoute=require("./routes/admin")
const superAdminRoute=require("./routes/superAdmin")
const session = require('express-session')
 const mongoStore=require("connect-mongo")(session)
 var cookieParser = require('cookie-parser');
 const fileUpload = require('express-fileupload');
 const multipart =require("connect-multiparty")
var app=express();

//database setup
db.connect((err)=>{
    if (err)
    console.log("Connection error"+err)
    else
   console.log("Database connected");
  })

 //middlewares
  app.use(cookieParser());
 

 

 
  //Body-Parser to JSON
  app.use(express.json())
  app.use(cors({
  
    origin: "http://localhost:3000",
    credentials:true,       
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    optionSuccessStatus:200,
}))

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { expires:60*60*24},
  store:new mongoStore({url:"mongodb://localhost:27017/costumes"})
  
}))
  // Router setup middlewares
  // app.options('http://localhost:3000', cors()) 
  app.use("/",userRoute);
  app.use("/admin",adminRoute);
  app.use("/superadmin",superAdminRoute);


 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
 
 //file upload middleware
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
  })
);
   
var multipartMiddleware = multipart({ maxFieldsSize: (20 * 1024 * 1024) });
app.use(multipartMiddleware);

  // server setup
app.listen(3002,()=>{
    console.log("Express started")
})