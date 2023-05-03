const express=require("express");
const userHelpers = require("../helpers/userHelpers");
const router=express.Router();

router.post("/login", async (req, res) => {
    await userHelpers
      .Login(req.body.body)
      .then((response) => {
        req.session.user=response;
        res.send(response)
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  });
  router.post("/menu-list", async (req, res) => {
const data=req.body.data;
const restaurantId=data.id;
const tableNumber=data.tableno;
 
    await userHelpers.getAllMenuItem(restaurantId).then((menuItem)=>{
      res.send(menuItem)
    })
  

  });

  router.post("/register",async (req,res)=>{
    const registerData=req.body.registerDetails;
    console.log(req.body);
    userHelpers.registerUser(registerData).then((response)=>{
      console.log(response);
      res.send(response)
    })
  })

  router.post("/user_login",async (req,res)=>{
    const loginData=req.body.loginDetails;
    userHelpers.userLogin(loginData).then((response)=>{
      req.session.user=response;
      res.send(response) 
    })
  }) 
 
  router.post("/addto-cart",async (req,res)=>{
  const proId=req.body.cartData.proId;
  const userId=req.body.cartData.userId;
    userHelpers.addtoCart(userId,proId).then((response)=>{
      console.log(response);
      res.send(response)
    })
  }) 

  router.get("/get-cart",async (req,res)=>{
    let userId;
    if(req.session.user){
      userId=req.session.user._id;
    }
   
    await userHelpers.getCartProducts(userId).then((products)=>{
      res.send(products)
    })
  })
 
//
router.post("/confirm-order",(req,res)=>{
  const data=req.body.data;
  console.log(data);
  userHelpers.createOrder(data);
})



module.exports=router;