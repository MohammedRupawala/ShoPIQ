import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
   shippingInfo : {
    address:{
        type:String,
        required : true
    },
    city:{
        type : String,
        required : true
    },
    state : {
        type: String,
        required : true,
    },
    country : {
        type : String,
        required: true
    },
    pincode :{
        type : Number,
        required : true,
    },
   },
   user : {
    type : String,
    ref : "User",
    required : true,
   },
   subtotal :{
    type : Number,
    required : true,
   },
   shippingCharges :{
    type : Number,
    required : true,
   },
   tax :{
    type : Number,
    required : true,
   },
   discount :{
    type : Number,
    required : true,
   },
   total :{
    type : Number,
    required : true,
   },
   status :{
    type: String,
    enum : ["Processing" , "Shipped" , "Delivered" ],
    default : "Processing"
   },
   orderItems: [{
    name : String,
    photo : String,
    quantity : Number,
    price : Number,
    productId : {
        type :mongoose.Types.ObjectId,
        ref : "Product"
    }

   }]

},
{
    timestamps:true
})

export const Order = mongoose.model("Order",orderSchema)