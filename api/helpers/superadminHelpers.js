const db =require("../config/connection")
const collection=require('../config/collection')
const bcrypt=require("bcrypt")

// datas to bcrypt the password

module.exports={

  registerRestaurantAdmin:(dataToSave)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(dataToSave.password)
          var bcryptedPassword=  await bcrypt.hash(dataToSave.password, 10);
            dataToSave.password=bcryptedPassword;
        
db.get().collection(collection.RESTAURANT_ADMIN).insertOne(dataToSave)
.then((response)=>{
    console.log(response);
})
        })
    }
}