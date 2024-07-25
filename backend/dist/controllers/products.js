import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/products.js";
import errorHandler from "../utils/utilClass.js";
import { rm } from "fs";
import mongoose from "mongoose";
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
export const getLatestProduct = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has("latestProduct")) {
        products = JSON.parse(myCache.get("latestProducts"));
    }
    else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
        myCache.set("latestProducts", JSON.stringify(products));
    }
    res.status(201).json({
        success: true,
        products
    });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (myCache.has("category")) {
        categories = JSON.parse(myCache.get("category"));
    }
    else {
        categories = await Product.distinct("category");
        myCache.set("category", JSON.stringify(categories));
    }
    res.status(201).json({
        success: true,
        categories
    });
});
export const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has("adminProducts")) {
        products = myCache.get(JSON.parse("adminProducts"));
    }
    else {
        products = await Product.find({});
        myCache.set("adminProduct", JSON.stringify(products));
    }
    res.status(201).json({
        success: true,
        products
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    let product;
    const cacheKey = `product-${id}`;
    if (myCache.has(cacheKey)) {
        product = JSON.parse(myCache.get(cacheKey));
    }
    else {
        product = await Product.findById(id);
        if (!product)
            return next(new errorHandler("Product Not Found", 400));
        myCache.set(cacheKey, JSON.stringify(product));
    }
    res.status(201).json({
        success: true,
        product
    });
});
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
    await invalidateCache({ product: true, admin: true });
    res.status(201).json({
        success: true,
        message: `${newItem.name} Uploaded Successfully`
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await Product.findById(id);
    if (!product)
        return next(new errorHandler("Product Not Found", 400));
    if (photo) {
        rm(product.photo, () => {
            console.log("Photo Removed");
        });
        product.photo = photo.path;
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
    await invalidateCache({ product: true, productId: String(product._id), admin: true });
    res.status(201).json({
        success: true,
        message: `Updated Successfully`
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new errorHandler("Product Not Found Id", 400));
    rm(product.photo, () => {
        console.log("Photo Removed");
    });
    await product.deleteOne();
    await invalidateCache({ product: true, productId: String(product._id), admin: true });
    res.status(201).json({
        success: true,
        message: `Product Deleted Successfully`
    });
});
export const searchProduct = TryCatch(async (req, res, next) => {
    const { search, price, category, sort } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 6;
    const skip = limit * (page - 1);
    const BaseQuery = {};
    if (search) {
        BaseQuery.name = {
            $regex: new RegExp(search, 'i')
        };
    }
    if (price)
        BaseQuery.price = {
            $lte: Number(price),
        };
    if (category)
        BaseQuery.category = category;
    const [products, filteredProducts] = await Promise.all([
        Product.find(BaseQuery).sort(sort && { price: sort === "asc" ? 1 : 1 })
            .limit(limit)
            .skip(skip),
        Product.find(BaseQuery)
    ]);
    const totalPages = Math.ceil(filteredProducts.length / limit);
    res.status(201).json({
        success: true,
        products,
        totalPages
    });
});
