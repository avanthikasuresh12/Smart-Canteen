const express = require("express");
const auth = require("../config/auth");
const router = express.Router();
const superAdminHelpers = require("../helpers/superadminHelpers");

// Check the incoming user is Superadmin or not

router.post("/addoredit-RestaurantAdmin", async function (req, res) {
  let data = req.body.body;
  if (data.id == 0) {
    await superAdminHelpers.registerRestaurant(data).then((response) => {
      res.send(response);
    });
  } else {
    await superAdminHelpers.UpdateRestaurant(data).then((response) => {
      
    });
  }
});

router.get("/", async (req, res) => {
  await superAdminHelpers.getAllRestaurants().then((restaurantData) => {
    res.send(restaurantData);
  });
});

router.post("/login", async (req, res) => {
  await superAdminHelpers
    .Login(req.body.body)
    .then((response, token) => {
      res.cookie("access_token", token, { httpOnly: true }).send(response);
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});
router.post("/delete", async (req, res) => {
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
router.post("/change-status", async (req, res) => {
  const id = req.body.id;
  const status = req.body.status;
  await superAdminHelpers.changeStatus(id, status);
});
module.exports = router;
