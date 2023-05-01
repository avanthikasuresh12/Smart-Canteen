const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
// datas to bcrypt the password

module.exports = {
  // Registering new restaurant details
  registerRestaurant: (dataToSave) => {
    return new Promise(async (resolve, reject) => {
      console.log(dataToSave.password);
      var bcryptedPassword = await bcrypt.hash(dataToSave.password, 10);
      dataToSave.password = bcryptedPassword;
      dataToSave.role = "admin";
      delete dataToSave.id;
      db.get()
        .collection(collection.ADMIN) 
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
        .collection(collection.ADMIN)
        .find({role:"admin"}) 
        .toArray();
      resolve(RestaurantData);
    });
  }, 
  //Updating excisting restaurant details
  UpdateRestaurant: (prodDetails) => {
    return new Promise(async (resove, reject) => {
      db.get()
        .collection(collection.ADMIN)
        .updateOne(
          { _id: ObjectId(prodDetails.id) },
          {
            $set: {
              restaurantName: prodDetails.restaurantName,
              adminName: prodDetails.adminName,
              category: prodDetails.category,
              phone: prodDetails.phone,
              email: prodDetails.email,
              active: prodDetails.active,
              city:prodDetails.city,
              state:prodDetails.state,
              district:prodDetails.district
            },
          }
        )
        .then((response) => {
          resove(response);
        });
    });
  },

 



  //delete the excisting user

  DeleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ADMIN)
        .deleteOne({ _id: ObjectId(id) })
        .then((response) => {
          resolve({ message: "user deleted" });
        });
    });
  },

  //Change the active status

  changeStatus: (id, status) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ADMIN)
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              active: status,
            },
          }
        );
    });
  },
};
