import express from "express";
import { adminMiddleware } from "../middlewares/adminAuth.js";
import { deleteProduct,getAdminProducts,updateProduct,getAllCategories, getLatestProduct, getSingleProduct, newProduct, searchProduct } from "../controllers/products.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
app.post("/new",adminMiddleware,singleUpload,newProduct)
app.get("/latest",getLatestProduct)
app.get("/admin-products",adminMiddleware,getAdminProducts)
app.get("/categories",getAllCategories)
app.route("/:id").get(getSingleProduct).put(adminMiddleware,singleUpload,updateProduct).delete(adminMiddleware,deleteProduct)
//get All Product with Filter
app.get("/all",searchProduct)
export default app;