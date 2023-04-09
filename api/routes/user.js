const express=require("express");
const userHelpers = require("../helpers/userHelpers");
const router=express.Router();

router.post("/login", async (req, res) => {
    await userHelpers
      .Login(req.body.body)
      .then((response) => {
        req.session.user=response;
        console.log(req.session.user);
        res.send(response)
      })
      .catch((err) => {
        res.status(401).send(err);
      });
  });


module.exports=router;