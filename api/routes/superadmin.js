const { response } = require("express");
const express = require("express");
const router = express.Router();
const superAdminHelpers = require("../helpers/superadminHelpers");

router.post("/addoredit-RestaurantAdmin", async function (req, res) {

  let data = req.body.body;
  
  if (data.id == 0) {
    await superAdminHelpers.registerRestaurant(data).then((response) => {
      res.send(response);
    });
  } else {
 console.log(data);
    await superAdminHelpers.UpdateRestaurant(data).then((response) => {
      res.send(response);
    });
  }
});

router.get("/", async (req, res) => {
  await superAdminHelpers.getAllRestaurants().then((restaurantData) => {
    res.send(restaurantData);
  });
});
module.exports = router;
