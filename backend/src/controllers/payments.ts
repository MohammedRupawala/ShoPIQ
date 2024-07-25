import { stripe } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupons.js";
import errorHandler from "../utils/utilClass.js";
export const createStripe = TryCatch(async(req,res,next)=>{
    const {amount} = req.body
    if(!amount) return next(new errorHandler("Please Enter Amount",400))
    const paymentIntent = await stripe.paymentIntents.create({
    amount:Number(amount*100),
     currency : "inr"})

res.status(201).json({
    success:true,
    clientSectret : paymentIntent.client_secret
})
})
export const newCoupon = TryCatch(async(req,res,next)=>{
    const {coupon,amount} = req.body
    if(!coupon || !amount) return next(new errorHandler("Please Enter Code and Amount",400))
    await Coupon.create({couponCode : coupon,amount})
res.status(201).json({
    success:true,
    message:`Coupon Created with Copoun Code ${coupon} And Amount ${amount}`
})
})
export const applyDiscount = TryCatch(async(req,res,next)=>{
    const {coupon} = req.query
   const discount = await Coupon.findOne({couponCode : coupon})
if(!discount) return next(new errorHandler("Invalid Coupon Code",400))
res.status(201).json({
    success:true,
    message:discount.amount
})
})

export const allCoupons = TryCatch(async(req,res,next)=>{
const allCoupon = await Coupon.findOne({})
res.status(201).json({
    success:true,
    message:allCoupon
})
})

export const deleteCoupon = TryCatch(async(req,res,next)=>{
    console.log("hello")
    const {id} = req.params
    if(!id) return next(new errorHandler("Coupon Not Found",400))
    const allCoupon = await Coupon.findByIdAndDelete(id)
    res.status(201).json({
        success:true,
        message:`Copoun Deleted Succesfully`
    })
    })