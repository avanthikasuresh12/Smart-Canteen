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
      var bcryptedPassword = await bcrypt.hash(dataToSave.password, 10);
      dataToSave.password = bcryptedPassword;
      dataToSave.role = "admin";
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
              active: prodDetails.active,
            },
          }
        )
        .then((response) => {
          resove(response);
        });
    });
  },

  //Login superadmin

  Login: (data) => {
    return new Promise(async (resolve, reject) => {
      let superAdmin = await db
        .get()
        .collection(collection.SUPER_ADMIN)
        .findOne({ email: data.email });

      if (superAdmin) {
        if (superAdmin.password == data.password) {
          const token = jwt.sign(
            { id: superAdmin._id, role: superAdmin.role },
            auth.JWTTOKEN
          );
          resolve(superAdmin, token);
        } else {
          reject({ err: "Email or password incorrect" });
        }
      } else {
        reject({ err: "Email or password incorrect" });
      }
    });
  },

  //delete the excisting user

  DeleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.RESTAURANT_ADMIN)
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
        .collection(collection.RESTAURANT_ADMIN)
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
