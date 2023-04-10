const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { reject } = require("bcrypt/promises");
const { response } = require("express");
module.exports = {
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      const admin = await db
        .get()
        .collection(collection.USERS)
        .findOne({ email: userData.email });
      if (!admin) {
        reject({ message: "No user found" });
      } else {
        bcrypt.compare(userData.password, admin.password).then((err, res) => {
          if (err) {
            reject({ message: "Password incorrect!!" });
          }
          resolve(admin);
        });
      }
    });
  },

  editProfile: ( updateDetails) => {
    return new Promise(async (resolve, reject) => {
      var bcryptedPassword = await bcrypt.hash(updateDetails.password, 10);
      updateDetails.password = bcryptedPassword;
      await db
        .get()
        .collection(collection.USERS)
        .updateOne(
          { _id: ObjectId(updateDetails.id) },
          {
            $set: {
              restaurantName: updateDetails.restaurantName,
              adminName: updateDetails.adminName,
              category: updateDetails.category,
              phone: updateDetails.phone,
              email: updateDetails.email,
              city:updateDetails.city,
              state:updateDetails.state,
              district:updateDetails.district,
              password:updateDetails.password,
            },
          }
        )
        .then(() => {
          resolve({ message: "profile updated" });
        });
    });
  },
  addCategory: (categoryData, id) => {
    return new Promise(async (resolve, reject) => {
      categoryData.restaurnat_id = id;
      delete categoryData.id;
      await db
        .get()
        .collection(collection.CATEGORY)
        .insertOne(categoryData)
        .then((response) => {
          resolve(response);
        });
    });
  },
  updateCategory: (categoryData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CATEGORY)
        .updateOne(
          { _id: ObjectId(categoryData.id) },
          {
            $set: {
              name: categoryData.name,
              description: categoryData.description,
            },
          }
        )
        .then(() => {
          resolve({ message: "Category updated!!" });
        });
    });
  },
  addMenuItem: (menuItemData, id) => {
    return new Promise(async (resolve, reject) => {
      menuItemData.restaurnat_id = id;
      await db
        .get()
        .collection(collection.MENU_ITEM)
        .insertOne(menuItemData)
        .then((response) => {
          resolve(response);
        });
    });
  },
  editMenuItem: (menuData) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MENU_ITEM)
        .updateOne(
          { _id: ObjectId(menuData.id) },
          {
            $set: {
              name: menuData.name,
              category: menuData.category,
              available: menuData.available,
              price: menuData.price,
              description: menuData.description, 
            },
          }
        )
        .then(() => {
          resolve({ message: "Menu item updated!!" });
        });
    });
  },
  getAllMenuItems: (restaurantId) => {
    return new Promise(async (resolve, reject) => {
      const MenuItems = await db
        .get()
        .collection(collection.MENU_ITEM)
        .find({ restaurnat_id:  restaurantId })
        .toArray()
       
          resolve(MenuItems);
      
    });
  },

  deleteMenuItem: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.MENU_ITEM)
        .deleteOne({ _id: id })
        .then(() => {
          resolve({ message: "Item Deleted!!" });
        });
    });
  },

  getMenuItem: (id) => {
    return new Promise(async (resolve, reject) => {
      const item = await db
        .get()
        .collection(collection.MENU_ITEM)
        .findOne({
          _id: ObjectId(id),
        })
       
          resolve(item);
     
    });
  },

  getCategory: (id) => {
    return new Promise(async (resolve, reject) => {
      console.log("done");
      const item = await db
        .get()
        .collection(collection.CATEGORY)
        .findOne({
          _id: ObjectId(id)
        }) 
        resolve(item)
    });
  },

  getAllCategory: (restaurnatId) => {
    return new Promise(async (resolve, reject) => {
      const categories = await db
        .get()
        .collection(collection.CATEGORY)
        .find({ restaurnat_id: restaurnatId })
        .toArray()
         
          resolve(categories);
       
    });
  },
  deleteCategory: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.CATEGORY)
        .deleteOne({ _id: ObjectId(id) })
        .then(() => {
          resolve({ message: "Category deleted!!" });
        });
    });
  },
  deleteTable:(id)=>{
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.TABLE)
        .deleteOne({ _id: ObjectId(id) })
        .then(() => {
          resolve({ message: "Table deleted!!" });
        });
    });
  },

  getTable:(id)=>{
    return new Promise(async (resolve, reject) => {
      const item = await db
        .get()
        .collection(collection.TABLE)
        .findOne({
          _id: ObjectId(id).then(() => {
            resolve(item);
          }),
        });
    });
  },

  getAllTables:(restaurnatId)=>{
    return new Promise(async (resolve, reject) => {
      const tables = await db
        .get()
        .collection(collection.TABLE)
        .find({ restaurnat_id: restaurnatId })
        .toArray()
        .then(() => {
          resolve(tables);
        });
    }); 
  },

  createTable:(data,restaurantId)=>{
    return new Promise(async (resolve, reject) => {
      data.restaurnat_id = restaurantId;
      await db
        .get()
        .collection(collection.TABLE)
        .insertOne(data)
        .then((response) => {
          resolve(response);
        });
    });
  },

  UpdateTable:(data)=>{
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.TABLE)
        .updateOne(
          { _id: ObjectId(data.id) },
          {
            $set: {
              number:data.tableNO,
              seatCount:data.seatCount,
            },
          }
        )
        .then(() => {
          resolve({ message: "Table updated!!" });
        });
    });
  },
  getRestaurant:(id)=>{
    return new Promise((resolve,reject)=>{
      db.get().collection(collection.USERS).findOne({_id:ObjectId( id)}).then((response)=>{
resolve(response)
      })
    })
   
  }
};
