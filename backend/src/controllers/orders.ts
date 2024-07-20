import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { newOrderBody } from "../types/type.js";
import { Order } from "../models/orders.js";
import { decreaseStock, invalidateCache } from "../utils/features.js";
import errorHandler from "../utils/utilClass.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(async(req:Request<{},{},newOrderBody>,res,next)=>{
    const {
        shippingCharges,
        shippingInfo,
        subtotal,
        user,
        discount,
        tax,
        total,
        orderItems
    } =  req.body
    console.log('Request Body:', req.body); // Log the entire request body
    console.log("this is orderitem"  + orderItems)
    if( !shippingInfo
        || !subtotal
        || !tax
        || !total
        || !orderItems){
            return next(new errorHandler("Insufficient Detail",400))
        }
    const newOrder  =await Order.create({
        shippingCharges,
        shippingInfo,
        subtotal,
        user,
        discount,
        tax,
        total,
        orderItems
    })
    console.log ("hello" + newOrder)

    await decreaseStock(orderItems),
    await invalidateCache({product:true,
         order : true,
         admin : true,
         userId : user,
         productId : orderItems.map((i)=>String(i.productId))})
    res.status(200).json({
        success : true,
        message : "Order Placed Succesfully"
    })
})

export const myOrders = TryCatch(async (req,res,next) =>{
    const {id:user} = req.query
    const cacheKey = `My-Order-${user}`
    let orders=[]
    if(myCache.has(cacheKey)){
         orders = JSON.parse(myCache.get(cacheKey) as string)
    }
    else{
         orders = await Order.find({user})
         myCache.set(cacheKey,JSON.stringify(orders))
    }
    res.status(200).json({
        success : true,
        orders
    })
})
export const allOrders = TryCatch(async (req,res,next) =>{
    const cacheKey = `allOrders`
    let orders=[]
    if(myCache.has(cacheKey)){
         orders = JSON.parse(myCache.get(cacheKey) as string)
    }
    else{
         orders = await Order.find().populate("user","name")
         myCache.set(cacheKey,JSON.stringify(orders))
    }
    console.log(orders.orderItems)
    res.status(200).json({
        success : true,
        orders
    })
})

export const getSingleOrder = TryCatch(async(req,res,next)=>{
    const id = req.params.id
    let order
    const cacheKey = `order-${id}`
    if(myCache.has(cacheKey)){
        order = JSON.parse(myCache.get(cacheKey) as string)
    }
    else {
     order = await Order.findById(id).populate("user","name")
     if(!order) return  next(new errorHandler("Product Not Found",400))
     myCache.set(cacheKey,JSON.stringify(order))
    }   
       res.status(201).json({
            success:true,
            order
        })
})
export const updateOrder = TryCatch(async(req,res,next)=>{
    const {id} = req.params
    const order = await Order.findById(id)
    if(!order) return  next(new errorHandler("Invalid Order Id",400))
        switch(order.status){
    case "Processing":
        order.status = "Shipped"
        break;
    case "Shipped":
        order.status = "Delivered"
        break;
    default:order.status = "Delivered"
}    
        await order.save()
        await invalidateCache({product:false,order:true,admin:true,userId:order.user,orderId:String(order._id)})

    res.status(201).json({
        success:true,
        message:`Updated Successfully`
    })
 })

 export const deleteOrder = TryCatch(async(req,res,next)=>{
        
    const order = await Order.findById(req.params.id)
    if(!order) return  next(new errorHandler("Invalid Product Id",400))
    await Order.deleteOne()
    await invalidateCache({product:false,order:true,admin:true,userId:order.user,orderId:String(order._id)})

       res.status(201).json({
        success:true,
        message:`Product Deleted Successfully`
    })
})
