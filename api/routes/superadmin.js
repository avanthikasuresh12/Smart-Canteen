const express = require("express");
const router = express.Router();
const superAdminHelpers = require("../helpers/superadminHelpers");

// Check the incoming user is Superadmin or not
const checkSuperAdmin=(req,res,next)=>{
if(!req.session.user){
console.log("lot logined");
}else if(req.session.user.role=="superAdmin"){
  console.log(true);
next()
}
}
router.post("/addoredit-RestaurantAdmin",checkSuperAdmin, async function (req, res) {
  let data = req.body.body;
  if (data.id == 0) {
    await superAdminHelpers.registerRestaurant(data).then((response) => {
      res.send(response);
    });
  } else {
    await superAdminHelpers.UpdateRestaurant(data).then((response) => {
      res.send(response)
    });
  }
});

router.get("/", checkSuperAdmin,async (req, res) => {
  console.log(req.session.user);
  await superAdminHelpers.getAllRestaurants().then((restaurantData) => {
    res.send(restaurantData);
  });
});


router.post("/delete",checkSuperAdmin, async (req, res) => {
  const id = req.body.id;
  await superAdminHelpers
    .DeleteUser(id)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
router.post("/change-status",checkSuperAdmin, async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  await superAdminHelpers.changeStatus(id, status);
});
module.exports = router;
