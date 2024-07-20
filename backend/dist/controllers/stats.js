import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/orders.js";
import { Product } from "../models/products.js";
import { User } from "../models/user.js";
import { calculatePercentage } from "../utils/features.js";
export const dashboardStats = TryCatch(async (req, res, next) => {
    const cacheKey = "admin-stats";
    let stats;
    if (myCache.has(cacheKey))
        stats = JSON.parse(myCache.get(cacheKey));
    else {
        const today = new Date();
        const thisMonth = {
            start: new Date(today.getFullYear(), today.getMonth(), 1),
            end: today
        };
        const lastMonth = {
            start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
            end: new Date(today.getFullYear(), today.getMonth(), 0)
        };
        const sixMonthAgo = new Date();
        const lastSixMonthAgo = sixMonthAgo.setMonth(sixMonthAgo.getMonth() - 6);
        const thisMonthProductPromise = Product.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end
            }
        });
        const lastMonthProductPromise = Product.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end
            }
        });
        const thisMonthUserPromise = User.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end
            }
        });
        const lastMonthUserPromise = User.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end
            }
        });
        const thisMonthOrderPromise = Order.find({
            createdAt: {
                $gte: thisMonth.start,
                $lte: thisMonth.end
            }
        });
        const lastMonthOrderPromise = Order.find({
            createdAt: {
                $gte: lastMonth.start,
                $lte: lastMonth.end
            }
        });
        const lastSixMonthOrderPromise = Order.find({
            createdAt: {
                $gte: lastSixMonthAgo,
                $lte: today
            }
        });
        const latestTransactionPromise = Order.find({}).select(["orderItems", "discount", "total", "status"]).limit(4);
        const [thisMonthOrder, thisMonthProduct, thisMonthUser, lastMonthOrder, lastMonthProduct, lastMonthUser, productCount, userCount, allOrder, lastSixMonthOrders, allCategories, femaleUsers, latestTransaction] = await Promise.all([
            thisMonthOrderPromise,
            thisMonthProductPromise,
            thisMonthUserPromise,
            lastMonthOrderPromise,
            lastMonthProductPromise,
            lastMonthUserPromise,
            Product.countDocuments(),
            User.countDocuments(),
            Order.find({}).select("total"),
            lastSixMonthOrderPromise,
            Product.distinct("category"),
            User.countDocuments({ gender: "female" }),
            latestTransactionPromise
        ]);
        console.log("orderItems ");
        // console.log( 
        //     "this Month Order" + thisMonthOrder,
        //     "this Month product" +thisMonthProduct,
        //     "this Month user" +thisMonthUser,
        //     "last Month Order" +lastMonthOrder,
        //     "last Month product" +lastMonthProduct,
        //     "last Month user" +lastMonthUser)
        const thisMonthRevenue = thisMonthOrder.reduce((total, current) => total + (current.total || 0), 0);
        const lastMonthRevenue = lastMonthOrder.reduce((total, current) => total + (current.total || 0), 0);
        const percent = {
            revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
            product: calculatePercentage(thisMonthProduct.length, lastMonthProduct.length),
            user: calculatePercentage(thisMonthUser.length, lastMonthUser.length),
            order: calculatePercentage(thisMonthOrder.length, lastMonthOrder.length)
        };
        const revenue = allOrder.reduce((total, current) => total + (current.total || 0), 0);
        const CategoriesCountPromise = allCategories.map((category) => Product.countDocuments({ category }));
        const categoriesCount = await Promise.all(CategoriesCountPromise);
        const categories = [];
        allCategories.forEach((category, i) => {
            categories.push({
                [category]: Math.round((categoriesCount[i] / productCount) * 100)
            });
        });
        const count = {
            revenue,
            product: productCount,
            user: userCount,
            order: allOrder.length
        };
        const orderCount = Array(6).fill(0);
        const orderRevenue = Array(6).fill(0);
        lastSixMonthOrders.forEach((order) => {
            const creation = order.createdAt;
            const monthDiff = (today.getMonth() - creation.getMonth() + 12) % 12;
            if (monthDiff < 6) {
                orderCount[5 - monthDiff] += 1;
                orderRevenue[5 - monthDiff] += order.total;
            }
        });
        const chart = {
            order: orderCount,
            revenue: orderRevenue
        };
        const userRatio = {
            male: userCount - femaleUsers,
            female: femaleUsers
        };
        const modifiedTransaction = latestTransaction.map(i => ({
            _id: i._id,
            discount: i.discount,
            quantity: i.orderItems.length,
            amount: i.total,
            status: i.status
        }));
        stats = {
            percent,
            categories,
            count,
            chart,
            userRatio,
            latestTransaction: modifiedTransaction,
        };
        myCache.set(cacheKey, JSON.stringify(stats));
    }
    res.status(201).json({
        success: true,
        stats
    });
});
export const pieChart = TryCatch(async (req, res, next) => {
});
export const barChart = TryCatch(async (req, res, next) => {
});
export const lineChart = TryCatch(async (req, res, next) => {
});
