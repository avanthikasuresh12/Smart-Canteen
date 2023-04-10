const db=require("../config/connection")
const collection=require("../config/collection")
const bcrypt=require("bcrypt")
module.exports={
Login: (data) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USERS)
        .findOne({ email: data.email });

      if (user) {
        if(user.email=="superadmin@gmail.com"){
            if (user.password == data.password) {
                resolve(user);
              } else {
                console.log("error");
                reject({ err: "Email or password incorrect" });
              }
        }else{
            console.log("bcrypt");
            console.log(data.password);
            console.log(user.password);
            bcrypt.compare(data.password, user.password).then(( res,err) => {
              if(res){
                    console.log("res"+res);
                    resolve(user)
                }
                console.log("err");
               reject({err:"Email or password incorrect"})
              });
        }
        
      } else {
        console.log("hai");
        reject({ err: "Email or password incorrect" });
      }
    });
  },
}