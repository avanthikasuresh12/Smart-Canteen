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
    }).catch(()=>{
res.send({message:"Password or email error"})
    })
  }) 
 
  router.post("/addto-cart",async (req,res)=>{
  const proId=req.body.cartData.proId;
  const userId=req.body.cartData.userId;
  const restaurantId=req.body.cartData.restaurantId;
    userHelpers.addtoCart(userId,proId,restaurantId).then((response)=>{
      res.send(response)
    })
  }) 

  router.post("/get-cart",async (req,res)=>{
    let userId;
    if(req.session.user){
      userId=req.session.user._id;
    }
   const restaurantId=req.body.restaurantId;
 
    await userHelpers.getCartProducts(userId,restaurantId).then((products)=>{
      res.send(products)
    })
  })
  
//
router.post("/confirm-order",(req,res)=>{
  const data=req.body.data;
  let userId;
  if(req.session.user){
    userId=req.session.user._id;
  }
  console.log(data);
  userHelpers.createOrder(data,userId).then(( )=>{
    res.send(true)
  })
})

router.post("/logout",(req,res)=>{
 req.session.user=null;
 req.session.destroy();
 res.send(true)
})

router.get("/get-orders",(req,res)=>{
  let userId;
  if(req.session.user){
    userId=req.session.user._id;
  }
  
userHelpers.getAllOrders(userId).then((orders)=>{
   
  res.send(orders)
})
})


router.post("/update-payment",(req,res)=>{
 console.log(req.body);
  userHelpers.updatePaymentStatus(req.body.id).then(()=>{
    res.send(true)
  })
})
module.exports=router;