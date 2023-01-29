const db=require("../config/connection");

const userCollection=require("../config/collection");

module.exports={

signUp:(userData)=>{


    return new Promise(async (resolve, reject) => {
console.log(userData);
    await db.get().collection(userCollection.USER_COLLECTION).insertOne(userData).then((response)=>{
    resolve(response)
 
})
        
    })
}




}
