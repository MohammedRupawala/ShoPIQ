import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    couponCode: {
        type: String,
        required: [true, "Please Enter Coupon Code"],
        unique: true
    },
    amount: {
        type: Number,
        required: [true, "Please Enter The Amount"]
    }
});
export const Coupon = mongoose.model("Coupon", couponSchema);
