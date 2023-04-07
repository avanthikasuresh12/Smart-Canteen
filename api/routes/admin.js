const { response } = require("express");
const express = require("express");
const router = express.Router();
const adminHelpers = require("../helpers/adminHelpers");
router.post("/login", async function (req, res) {
  const data = req.body;
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
  const id = req.body.id;
  const updateDetails = req.body;
  adminHelpers.editProfile(id, updateDetails).then((response) => {
    res.send(response);
  });
});

//add or edit   categories of menu to the hotel

router.post("/addoredit-category", (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
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
router.get("/category", (req, res) => {
  const restaurantId = req.body.id;
  adminHelpers.getAllCategory(restaurantId).then((response) => {
    res.send(response);
  });
});

// add or edit   menu items to the hotel;
router.post("/addoredit-menuitem", (req, res) => {
  const id = req.body.id;
  const data = req.body.data;
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
  const restaurantId = 0;
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
  adminHelpers.deleteMenuItem(id).then((response) => {
    res.send(response);
  });
});

module.exports = router;
