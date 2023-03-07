const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const {  ObjectId } = require("mongodb");
const { response } = require("express");

// datas to bcrypt the password

module.exports = {
  // Registering new restaurant details
  registerRestaurant: (dataToSave) => {
    return new Promise(async (resolve, reject) => {
      console.log(dataToSave.password);
      var bcryptedPassword = await bcrypt.hash(dataToSave.password, 10);
      dataToSave.password = bcryptedPassword;
delete dataToSave.id;
      db.get()
        .collection(collection.RESTAURANT_ADMIN)
        .insertOne(dataToSave)
        .then((response) => {
          resolve(response);
        });
    });
  },

  // Getting all restaurant details

  getAllRestaurants: () => {
    return new Promise(async (resolve, reject) => {
      let RestaurantData = db
        .get()
        .collection(collection.RESTAURANT_ADMIN)
        .find()
        .toArray();
      resolve(RestaurantData);
    });
  },
  //Updating excisting restaurant details
  UpdateRestaurant: (prodDetails) => {
    return new Promise(async (resove, reject) => {
      console.log(prodDetails.id);
      db.get()
        .collection(collection.RESTAURANT_ADMIN)
        .updateOne(
          { _id: ObjectId(prodDetails.id) },
          {
            $set: {
              restaurantName: prodDetails.restaurantName,
              adminName: prodDetails.adminName,
              category: prodDetails.category,
              phone: prodDetails.phone,
              email: prodDetails.email,
              active:prodDetails.email.active,
            },
          }
        ).then((response)=>{
           resove(response)
        })
    });
  },

  //Login superadmin

 Login:(data)=>{
 return new Promise(async(resolve,reject)=>{
 let superAdmin=await db.get()
  .collection(collection.SUPER_ADMIN)
  .findOne({email:data.email})
 console.log(superAdmin.password, "+", data.password);
 if(superAdmin){
  if(superAdmin.password==data.password){
    console.log("login succces");
  }else{
    console.log("login Failed");
  }
 }else{
  console.log("no user");
 }
 
}
 )
  }
}

