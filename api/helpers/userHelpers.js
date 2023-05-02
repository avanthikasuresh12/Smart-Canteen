const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
module.exports = {
  Login: (data) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.ADMIN)
        .findOne({ email: data.email });

      if (user) {
        if (user.email == "superadmin@gmail.com") {
          if (user.password == data.password) {
            resolve(user);
          } else {
            console.log("error");
            reject({ err: "Email or password incorrect" });
          }
        } else {
          console.log("bcrypt");
          console.log(data.password);
          console.log(user.password);
          bcrypt.compare(data.password, user.password).then((res, err) => {
            if (res) {
              console.log("res" + res);
              resolve(user);
            }
            console.log("err");
            reject({ err: "Email or password incorrect" });
          });
        }
      } else {
        console.log("hai");
        reject({ err: "Email or password incorrect" });
      }
    });
  },

  getAllMenuItem: (restaurantId) => {
    return new Promise((resolve, reject) => {
      const menuItems = db
        .get()
        .collection(collection.MENU_ITEM)
        .find({
          restaurnat_id: restaurantId,
        })
        .toArray();
      resolve(menuItems);
    });
  },
  addtoCart(userId, proId) {
    let proObj = {
      item: ObjectId(proId),
      quantity: 1,
    };
    return new Promise(async (resolve, reject) => {
      let userCart = await db
        .get()
        .collection(collection.CART)
        .findOne({ user: ObjectId(userId) });
      if (!userCart) {
        let cartObj = {
          user: ObjectId(userId),
          products: [proObj],
        };
        db.get()
          .collection(collection.CART)
          .insertOne(cartObj)
          .then((response) => {
            resolve();
          });
      } else {
        proIndex = userCart.products.findIndex(
          (product) => product.item == proId
        );
        console.log(proIndex);
        if (proIndex != -1) {
          db.get()
            .collection(collection.CART)
            .updateOne(
              { user: ObjectId(userId), "products.item": ObjectId(proId) },
              { $inc: { "products.$.quantity": 1 } }
            )
            .then((response) => {
              resolve();
            });
        } else {
          db.get()
            .collection(collection.CART)
            .updateOne(
              { user: ObjectId(userId) },
              {
                $push: { products: proObj },
              }
            )
            .then((response) => {
              resolve();
            });
        }
      }
    });
  },

  registerUser: (registerData) => {
    return new Promise(async (resolve, reject) => {
      var bcryptedPassword = await bcrypt.hash(registerData.password, 10);
      registerData.password = bcryptedPassword;
      registerData.role = "user";
      delete registerData.id;
      await db
        .get()
        .collection(collection.USERS)
        .insertOne(registerData)
        .then((response) => {
          resolve({ message: "Registered" });
        });
    });
  },

  userLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection(collection.USERS)
        .findOne({ email: data.email });

      if (user) {
        bcrypt.compare(data.password, user.password).then((res, err) => {
          if (res) {
            resolve(user);
          }
          console.log("err");
          reject({ err: "Email or password incorrect" });
        });
      } else {
        reject({ err: "Email or password incorrect" });
      }
    });
  },

  getCartProducts: (userId) =>
    new Promise(async (resolve, reject) => {
      const cartItems = await db
        .get()
        .collection(collection.CART)
        .aggregate([
          {
            $match: {
              user: ObjectId(userId),
            },
          },
          {
            $unwind: "$products",
          },
          {
            $project: {
              item: "$products.item",
              quantity: "$products.quantity",
            },
          },
          {
            $lookup: {
              from: collection.MENU_ITEM,
              localField: "item",
              foreignField: "_id",
              as: "products",
            },
          },
          {
            $project: {
              item: 1,
              quantity: 1,
              products: { $arrayElemAt: ["$products", 0] },
            },
          },
        ])
        .toArray();
      resolve(cartItems);
    }),
};
