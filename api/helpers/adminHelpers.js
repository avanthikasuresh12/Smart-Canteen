const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const { reject } = require("bcrypt/promises");
module.exports = {
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      const admin = await db
        .get()
        .collection(collection.RESTAURANT_ADMIN)
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

  editProfile: (id, updateDetails) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.RESTAURANT_ADMIN)
        .updateOne(
          { _id: ObjectId(id) },
          {
            $set: {
              restaurantName: updateDetails.restaurantName,
              adminName: updateDetails.adminName,
              category: updateDetails.category,
              phone: updateDetails.phone,
              email: updateDetails.email,
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
        .collection(collection.CATEGORY)
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
        .find({ restaurnat_id: ObjectId(restaurantId) })
        .toArray()
        .then((response) => {
          resolve(MenuItems);
        });
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
        .then(() => {
          resolve(item);
        });
    });
  },

  getCategory: (id) => {
    return new Promise(async (resolve, reject) => {
      const item = await db
        .get()
        .collection(collection.CATEGORY)
        .findOne({
          _id: ObjectId(id).then(() => {
            resolve(item);
          }),
        });
    });
  },

  getAllCategory: (restaurnatId) => {
    return new Promise(async (resolve, reject) => {
      const categories = await db
        .get()
        .collection(collection.CATEGORY)
        .find({ restaurnat_id: restaurnatId })
        .toArray()
        .then(() => {
          resolve(categories);
        });
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
};
