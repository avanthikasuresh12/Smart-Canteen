const jwt = require("jsonwebtoken");
module.exports = {
  JWTTOKEN: "ALSZ3mdXXHuT`{NPe^Gmr^Z*B<c'kU",
  verifyToken: (req, res, next) => {
    
    const token = req.cookies.access_token;
    if (!token) {
      console.log("No token");
    } else {
      jwt.verify(token, this.JWTTOKEN, (err, user) => {
        if (err) {
          console.log("err");
        } else {
            req.user=user;
          next();
        }
      });
    }
  },
};
