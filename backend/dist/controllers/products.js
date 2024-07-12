import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/products.js";
import errorHandler from "../utils/utilClass.js";
import { rm } from "fs";
import mongoose from "mongoose";
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new errorHandler("Please Add Photo", 400));
    if (!name || !category || !photo || !price) {
        rm(photo.path, () => {
            console.log("Photo Removed");
        });
        return next(new errorHandler("Insufficient Details", 400));
    }
    const newItem = await Product.create({
        name,
        price,
        photo: photo.path,
        stock,
        category: category.toLowerCase()
    });
    res.status(201).json({
        success: true,
        message: `${newItem.name} Uploaded Successfully`
    });
});
export const getLatestProduct = TryCatch(async (req, res, next) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    res.status(201).json({
        success: true,
        products
    });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Product.distinct("category");
    res.status(201).json({
        success: true,
        categories
    });
});
export const getAdminProducts = TryCatch(async (req, res, next) => {
    const products = await Product.find({});
    res.status(201).json({
        success: true,
        products
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params;
    if (!id || !isValidObjectId(id))
        return next(new errorHandler("Product Not Found", 404));
    const product = await Product.findById(id);
    if (!product)
        return next(new errorHandler("Invalid Product Id", 400));
    console.log("hello");
    res.status(201).json({
        success: true,
        product
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
        return next(new errorHandler("Invalid Product Id", 400));
    if (photo) {
        rm(product.photo, () => {
            console.log("Photo Removed");
        });
        product.photo = photo.path;
        return next(new errorHandler("Insufficient Details", 400));
    }
    if (name)
        product.name = name;
    if (category)
        product.category = category;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    await product.save();
    res.status(201).json({
        success: true,
        message: `Updated Successfully`
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new errorHandler("Invalid Product Id", 400));
    rm(product.photo, () => {
        console.log("Photo Removed");
    });
    await Product.deleteOne();
    console.log("hello");
    res.status(201).json({
        success: true,
        message: `Product Deleted Successfully`
    });
});
