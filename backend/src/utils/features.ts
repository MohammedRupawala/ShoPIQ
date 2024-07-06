import mongoose from "mongoose"
export const connectDB = ()=>{
    mongoose.connect("mongodb+srv://mohammedrupawala11:Mohammed%402005@practice.bq7tchs.mongodb.net/",{
        dbName : "ShopIQ24"
    }).then(c=>console.log("Db Connected"))
    .catch((e)=>console.log(e))
}