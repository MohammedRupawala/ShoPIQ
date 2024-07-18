import mongoose from "mongoose"
import {  invalidateCacheProps, orderItemsType } from "../types/type.js"
import { myCache } from "../app.js"
import { Product } from "../models/products.js"
import { Order } from "../models/orders.js"

export const connectDB = (uri : string)=>{
    mongoose.connect(uri,{
        dbName : "ShopIQ24"
    }).then(c=>console.log("Db Connected"))
    .catch((e)=>console.log(e))
}


export const invalidateCache = async({product,order,admin,userId,orderId,productId }: invalidateCacheProps) => {
    if(order){
        const orderKeys : string[] = [
            `My-Order-${userId}`,
            "allOrders",
            `order-${orderId}`
        ]
        const orders = await Order.find({}).select("_id")
        myCache.del(orderKeys)
    }
    if(product){
        const productKeys : string[] = [
            "latestProducts",
            "category",
            "adminProducts"
        ]

        if(typeof productId === "string")  productKeys.push(`product-${productId}`)
        if(typeof productId === "object")
            {
                productId.forEach(i => {
                    productKeys.push(`product-${i}`)
                });
            }
        const products = await Product.find({}).select("_id")
        
        myCache.del(productKeys)
     }
    if(admin){
        
    }
}

export const decreaseStock = async(orderItems: orderItemsType[]) => {
    for(let i = 0;i<orderItems.length;i++){
        const order = orderItems[i];
        const product = await Product.findById(order.productId)
        if(!product) throw new Error("Product Not Found")
        product.stock = product.stock  - order.quantity
    product.save()
    }
}

// export const caching = async({key,element}:cachingProps)=>{
//     if(myCache.has(key)){
//         element = JSON.parse(myCache.get(key) as string)
//    }
// }