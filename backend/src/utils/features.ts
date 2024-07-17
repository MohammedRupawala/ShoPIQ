import mongoose from "mongoose"
import { invalidateCacheProps } from "../types/type.js"
import { myCache } from "../app.js"
import { Product } from "../models/products.js"
export const connectDB = ()=>{
    mongoose.connect("mongodb+srv://mohammedrupawala11:Mohammed%402005@practice.bq7tchs.mongodb.net/",{
        dbName : "ShopIQ24"
    }).then(c=>console.log("Db Connected"))
    .catch((e)=>console.log(e))
}


export const invalidateCache = async({product,order,admin }: invalidateCacheProps) => {
    if(order){

    }
    if(product){
        const productKeys : string[] = [
            "latestProducts",
            "category",
            "adminProducts"
        ]
        const products = await Product.find({}).select("_id")
        products.forEach(i => {
            productKeys.push(`product-${i._id}`)
        });
        myCache.del(productKeys)
     }
    if(admin){
        
    }
}