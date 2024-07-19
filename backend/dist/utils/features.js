import mongoose from "mongoose";
import { myCache } from "../app.js";
import { Product } from "../models/products.js";
import { Order } from "../models/orders.js";
export const connectDB = (uri) => {
    mongoose.connect(uri, {
        dbName: "ShopIQ24"
    }).then(c => console.log("Db Connected"))
        .catch((e) => console.log(e));
};
export const invalidateCache = async ({ product, order, admin, userId, orderId, productId }) => {
    if (order) {
        const orderKeys = [
            `My-Order-${userId}`,
            "allOrders",
            `order-${orderId}`
        ];
        const orders = await Order.find({}).select("_id");
        myCache.del(orderKeys);
    }
    if (product) {
        const productKeys = [
            "latestProducts",
            "category",
            "adminProducts"
        ];
        if (typeof productId === "string")
            productKeys.push(`product-${productId}`);
        if (typeof productId === "object") {
            productId.forEach(i => {
                productKeys.push(`product-${i}`);
            });
        }
        const products = await Product.find({}).select("_id");
        myCache.del(productKeys);
    }
    if (admin) {
    }
};
export const decreaseStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product Not Found");
        product.stock = product.stock - order.quantity;
        product.save();
    }
};
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth == 0)
        return thisMonth * 100;
    const percent = ((thisMonth - lastMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
// export const caching = async({key,element}:cachingProps)=>{
//     if(myCache.has(key)){
//         element = JSON.parse(myCache.get(key) as string)
//    }
// }
