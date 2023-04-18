const { response } = require("express");
const express = require("express");
const router = express.Router();
const adminHelpers = require("../helpers/adminHelpers");
router.post("/login", async function (req, res) {
  const data = req.body;
  console.log(data);
  adminHelpers
    .login(data)
  
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

// edit the hotels profile
router.post("/edit-profile", (req, res) => {
  
 
  const updateDetails = req.body.body;
  adminHelpers.editProfile( updateDetails).then((response) => {
    res.send(response);
  });
});

//add or edit   categories of menu to the hotel

router.post("/addoredit-category", (req, res) => {
  let id;
 if(req.session.user){
   id = req.session.user._id;
 }
 
  const data = req.body.registerData
 
  console.log(data);
  if (data.id == 0) {
    adminHelpers.addCategory(data, id).then((response) => {
      res.send(response);
    });
  } else {
    adminHelpers.updateCategory(data).then((response) => {
      res.send(response);
    });
  }
});

//get   single catgory
router.get("/category", (req, res) => {
  const id = req.body.id;
  
  adminHelpers.getCategory(id).then((response) => {
    res.send(response);
  });
});

//delete a  catgory
router.post("/delete-category", (req, res) => {
  const id = req.body.id;
  adminHelpers.deleteCategory(id).then((response) => {
    res.send(response);
  });
});
//get category list
router.get("/category-list", (req, res) => {
  let restaurantId;
  if(req.session.user){
     restaurantId=req.session.user._id;
  }
  
  adminHelpers.getAllCategory(restaurantId).then((response) => {
    res.send(response);
  });
});

// add or edit   menu items to the hotel;
router.post("/addoredit-menuitem", (req, res) => {
  let id ;
  if(req.session.user){
    id=req.session.user._id;
  }
  const data = req.body.data;
  console.log(data);
  if (data.id == 0) {
    adminHelpers.addMenuItem(data, id).then((response) => {
      res.send(response);
    });
  } else {
    adminHelpers.editMenuItem(data).then((response) => {
      res.send(response);
    });
  }
});

//list all menu item
router.get("/menu-items-list", async (req, res) => {
  var restaurantId;
  if(req.session.user){
    restaurantId=req.session.user._id;
  }
  adminHelpers.getAllMenuItems(restaurantId).then((response) => {
    res.send(response);
  });
});

// get single menu item
router.get("/menu-item", (req, res) => {
  const id = req.body.id;
  adminHelpers.getMenuItem(id).then((response) => {
    res.send(response);
  });
});

// delete menu item

router.post("/delete-menuitem", (req, res) => {
  const id = req.body.id;
  console.log(id);
  adminHelpers.deleteMenuItem(id).then((response) => {
    res.send(response);
  });
});

//create or edit new tables
router.post("/addoredit-table", (req, res) => {
  const data = req.body.data;
  let restaurantId;
  if(req.session.user){
    restaurantId = req.session.user._id
  }

  if (data.id == 0) {
    adminHelpers.createTable(data, restaurantId).then((response) => {
      res.send(response);
    });
  } else {
    adminHelpers.UpdateTable(data).then((response) => {
      res.send(response);
    });
  }
});

//get all tables

router.get("/table-list",(req,res)=>{
  let restaurantId;
  if(req.session.user){
      restaurantId=req.session.user._id;
  }
  adminHelpers.getAllTables(restaurantId).then((response)=>{
    res.send(response)
  })
})


//get single table

router.get("/table",(req,res)=>{
  const id=req.body.id;
  adminHelpers.getTable(id).then((response)=>{
    res.send(response)
  })
})

//delete a table

router.get("/delete-table",(req,res)=>{
  const id=req.body.id;
  adminHelpers.deleteTable(id).then((response)=>{
    res.send(response)
  })
})

//get single restaurant
router.post("/restaurant",(req,res)=>{
  const id=req.body.id;
 
  adminHelpers.getRestaurant(id).then((response)=>{
    res.send(response)
  })
})
 

module.exports = router;
