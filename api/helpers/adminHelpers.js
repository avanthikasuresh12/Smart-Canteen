const db = require("../config/connection");
const collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
 const QRCode=require("qrcode");
const { response } = require("express");
module.exports = {
  login: (userData) => {
    return new Promise(async (resolve, reject) => {
      const admin = await db
        .get()
        .collection(collection.ADMIN)
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

  editProfile: (updateDetails) => {
    return new Promise(async (resolve, reject) => {
      var bcryptedPassword = await bcrypt.hash(updateDetails.password, 10);
      updateDetails.password = bcryptedPassword;
      await db
        .get()
        .collection(collection.ADMIN)
        .updateOne(
          { _id: ObjectId(updateDetails.id) },
          {
            $set: {
              restaurantName: updateDetails.restaurantName,
              adminName: updateDetails.adminName,
              category: updateDetails.category,
              phone: updateDetails.phone,
              email: updateDetails.email,
              city: updateDetails.city,
              state: updateDetails.state,
              district: updateDetails.district,
              password: updateDetails.password,
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
        .insertOne(menuItemData).then((item)=>{
          resolve(item.insertedId.toString())
        })
         
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
              offer: menuData.offer,
            },
          }
        )
        .then((res) => {
          console.log(res);
          resolve(res);
        });
    });
  },
  getAllMenuItems: (restaurantId) => {
    return new Promise(async (resolve, reject) => {
      const MenuItems = await db
        .get()
        .collection(collection.MENU_ITEM)
        .find({ restaurnat_id: restaurantId })
        .toArray();

      resolve(MenuItems);
    });
  },

  deleteMenuItem: (id) => {
    return new Promise((resolve, reject) => {
      console.log("Some");
      db.get()
        .collection(collection.MENU_ITEM)
        .deleteOne({ _id: ObjectId(id) })
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
        });

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
          _id: ObjectId(id),
        });
      resolve(item);
    });
  },

  getAllCategory: (restaurnatId) => {
    return new Promise(async (resolve, reject) => {
      const categories = await db
        .get()
        .collection(collection.CATEGORY)
        .find({ restaurnat_id: restaurnatId })
        .toArray();

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
  deleteTable: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.TABLE)
        .deleteOne({ _id: ObjectId(id) })
        .then(() => {
          resolve({ message: "Table deleted!!" });
        });
    });
  },

  getTable: (id) => {
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

  getAllTables: (restaurnatId) => {
    return new Promise(async (resolve, reject) => {
      const tables = await db
        .get()
        .collection(collection.TABLE)
        .find({ restaurnat_id: restaurnatId })
        .toArray();

      resolve(tables);
    });
  },

  createTable: (data, restaurantId) => {
    return new Promise(async (resolve, reject) => {
      console.log("resraurant");
      console.log(restaurantId);
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

  UpdateTable: (data) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.TABLE)
        .updateOne(
          { _id: ObjectId(data.id) },
          {
            $set: {
              number: data.number,
              capacity: data.capacity,
            },
          }
        )
        .then(() => {
          resolve({ message: "Table updated!!" });
        });
    });
  },
  getRestaurant: (id) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.ADMIN)
        .findOne({ _id: ObjectId(id) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  generateQR: (url) => {
    
    return new Promise((resolve,reject)=>{
      QRCode.toDataURL(url, function (err, generatedURL) {
        console.log(generatedURL);
        resolve(generatedURL)
      }) 
    })
  },

  updateImageURL:(collectionID,itemID,path)=>{
    return new Promise(async(resolve,reject)=>{
      let collectionName;
      if(collectionID==1){
      collectionName=collection.ADMIN;
      }else if(collectionID==2){
        collectionName=collection.MENU_ITEM;
      }
    await  db.get()
      .collection(collection.MENU_ITEM)
      .updateOne(
        { _id: ObjectId(itemID) },
        {
          $set: {
            imagePath:path
          },
        }
      ).then((res)=>{
        console.log(res);
        resolve({message:"image added"})
      })
    })
 
  },

  getOrders:(id)=>{
return new Promise(async(resolve,reject)=>{
  const orders=await db.get().collection(collection.ORDER).find({restaurantId:id}) .toArray()
  resolve(orders)
})
  },

  updateOrderStatus:(data)=>{
    return new Promise(async(resolve,reject)=>{
      await db.get().collection(collection.ORDER).updateOne({_id:ObjectId(data.id)},
       
        {
          $set: {
            status:data.status
          },
        }
      )
    })
  },

  getSalesReport:(id)=>{
    
    return new Promise(async(resolve,reject)=>{
      var date7 = new Date();
date7.setDate(date7.getDate() - 7);
var finalDate7 = date7.getFullYear()+'-'+(date7.getMonth()+1)+'-'+ date7.getDate() 
var date30 = new Date();
date30.setDate(date30.getDate() - 30);
var finalDate30 = date30.getFullYear()+'-'+(date30.getMonth()+1)+'-'+ date30.getDate() 
var finalDateToday=new Date().toDateString()
console.log(finalDate7);
console.log(new Date(finalDate30));
console.log(new Date(finalDateToday)); 
const allOrders=await db.get().collection(collection.ORDER).find({restaurantId:id}) .toArray()
 const orderstoday=await db.get().collection(collection.ORDER).find({$and:[{date:{$gte:new Date(finalDateToday),$lt:new Date()}},{restaurantId:id}]}) .toArray()
      const orders7=await db.get().collection(collection.ORDER).find({$and:[{date:{$gte:new Date(finalDate7),$lt:new Date()}},{restaurantId:id}]}) .toArray()
      const orders30=await db.get().collection(collection.ORDER).find({$and:[{date:{$gte:new Date(finalDate30),$lt:new Date()}},{restaurantId:id}]}) .toArray()

      const totalReport={
        allOrders:allOrders,
        orderstoday:orderstoday,
        orders7:orders7,
        orders30:orders30,
      }
      resolve(totalReport)
    })
  }
};
