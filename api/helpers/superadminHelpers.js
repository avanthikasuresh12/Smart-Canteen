const db =require("../config/connection")
const collection=require('../config/collection')
const bcrypt=require("bcrypt")

// datas to bcrypt the password

module.exports={

  // Registering new restaurant details 
  registerRestaurantAdmin:(dataToSave)=>{
        return new Promise(async(resolve,reject)=>{
            console.log(dataToSave.password)
          var bcryptedPassword=  await bcrypt.hash(dataToSave.password, 10);
            dataToSave.password=bcryptedPassword;
        
db.get().collection(collection.RESTAURANT_ADMIN).insertOne(dataToSave)
.then((response)=>{
     resolve(response)
})
        })
    },



// Getting all restaurant details

getAllRestaurants:()=>{

  return new Promise(async(resolve,reject)=>{


    let RestaurantData=db.get().collection(collection.RESTAURANT_ADMIN).find().toArray();
    resolve(RestaurantData);
  })
}

}