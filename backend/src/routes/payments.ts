import express from "express";
import { adminMiddleware } from "../middlewares/adminAuth.js";
import { allCoupons, applyDiscount, deleteCoupon, newCoupon } from "../controllers/payments.js";
const app = express.Router();
app.post("/coupon/new",adminMiddleware,newCoupon)
app.get("/apply/discount",applyDiscount)
app.get("/coupon/all",adminMiddleware,allCoupons)
app.route("/coupon/:id").delete(adminMiddleware,deleteCoupon)

export default app;