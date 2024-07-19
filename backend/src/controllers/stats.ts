import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/orders.js";
import { Product } from "../models/products.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";

export const dashboardStats = TryCatch(async (req,res,next)=>{
    const cacheKey = "admin-stats"
    let stats
if(myCache.has(cacheKey)) stats = JSON.parse(myCache.get(cacheKey) as string)
    else{
        const today = new Date()
        const thisMonth = {
           start : new Date(today.getFullYear(),today.getMonth(),1),
           end:today
        }
        const lastMonth = {
            start : new Date(today.getFullYear(),today.getMonth()-1,1),
            end:new Date(today.getFullYear(),today.getMonth(),0)
        }

        const  thisMonthProductPromise =  Product.find({
            createdAt:{
                $gte:thisMonth.start,
                $lte:thisMonth.end
            }
        })
        const lastMonthProductPromise =  Product.find({
            createdAt:{
              $gte:lastMonth.start,
              $lte:lastMonth.end  
            }
        })
        const  thisMonthUserPromise =  User.find({
            createdAt:{
                $gte:thisMonth.start,
                $lte:thisMonth.end
            }
        })
        const lastMonthUserPromise =  User.find({
            createdAt:{
              $gte:lastMonth.start,
              $lte:lastMonth.end  
            }
        })
        const  thisMonthOrderPromise =  Order.find({
            createdAt:{
                $gte:thisMonth.start,
                $lte:thisMonth.end
            }
        })
        const lastMonthOrderPromise =  Order.find({
            createdAt:{
              $gte:lastMonth.start,
              $lte:lastMonth.end  
            }
        })

        const [
            thisMonthOrder,
            thisMonthProduct,
            thisMonthUser,
            lastMonthOrder,
            lastMonthProduct,
            lastMonthUser,
            productCount,
            UserCount,
            allOrder
        ] = await Promise.all([
            thisMonthOrderPromise,
            thisMonthProductPromise,
            thisMonthUserPromise,
            lastMonthOrderPromise,
            lastMonthProductPromise,
            lastMonthUserPromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total")
        ])
        // console.log( 
        //     "this Month Order" + thisMonthOrder,
        //     "this Month product" +thisMonthProduct,
        //     "this Month user" +thisMonthUser,
        //     "last Month Order" +lastMonthOrder,
        //     "last Month product" +lastMonthProduct,
        //     "last Month user" +lastMonthUser)
        const thisMonthRevenue = thisMonthOrder.reduce(
            (total,current)=>total + (current.total || 0 ),0
        )
        const lastMonthRevenue = lastMonthOrder.reduce(
            (total,current)=>total + (current.total || 0 ),0
        )
        const  percent = {
            revenue : calculatePercentage(thisMonthRevenue,lastMonthRevenue),
            product : calculatePercentage(thisMonthProduct.length,lastMonthProduct.length),
            user : calculatePercentage(thisMonthUser.length,lastMonthUser.length),
            order : calculatePercentage(thisMonthOrder.length,lastMonthOrder.length)
        }
        const revenue = allOrder.reduce(
            (total,current)=>total + (current.total || 0 ),0
        )
        const count = {
            revenue,
            product : productCount,
            user : UserCount,
            order : allOrder.length 

        }
        stats = {
            percent,
            count
        }
}
res.status(201).json({
    success :true,
    stats
})
})
export const pieChart = TryCatch(async (req,res,next)=>{
    
})
export const barChart = TryCatch(async (req,res,next)=>{
    
})
export const lineChart = TryCatch(async (req,res,next)=>{
    
})