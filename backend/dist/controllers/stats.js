import { myCache } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Order } from "../models/orders.js";
import { Product } from "../models/products.js";
import { User } from "../models/user.js";
import { calculatePercentage, getCounts, getInventory } from "../utils/features.js";
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
            latestTransactionPromise,
        ]);
        const thisMonthRevenue = thisMonthOrder.reduce((total, current) => total + (current.total || 0), 0);
        const lastMonthRevenue = lastMonthOrder.reduce((total, current) => total + (current.total || 0), 0);
        const percent = {
            revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
            product: calculatePercentage(thisMonthProduct.length, lastMonthProduct.length),
            user: calculatePercentage(thisMonthUser.length, lastMonthUser.length),
            order: calculatePercentage(thisMonthOrder.length, lastMonthOrder.length)
        };
        const revenue = allOrder.reduce((total, current) => total + (current.total || 0), 0);
        const categories = getInventory({ allCategories, productCount });
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
    const cacheKey = "admin-Pie-Charts";
    let charts;
    if (myCache.has(cacheKey))
        charts = JSON.parse(myCache.get(cacheKey));
    else {
        const [shippingOrderCount, processOrderCount, deliveredOrderCount, allCategories, productCount, outOfStock, completeRevenueStats, allUser, userRole, adminRole] = await Promise.all([
            Order.countDocuments({ status: "Shipped" }),
            Order.countDocuments({ status: "Processing" }),
            Order.countDocuments({ status: "Delivered" }),
            Product.distinct("category"),
            Product.countDocuments(),
            Product.countDocuments({ stock: 0 }),
            Order.find({}).select('total discount tax shippingCharges subTotal'),
            User.find({}).select("dob"),
            User.countDocuments({ role: "user" }),
            User.countDocuments({ role: "admin" })
        ]);
        console.log(completeRevenueStats);
        const grossIncome = completeRevenueStats.reduce((gross, current) => gross + (current.total || 0), 0);
        const discount = completeRevenueStats.reduce((discount, current) => discount + (current.discount || 0), 0);
        const productionCost = completeRevenueStats.reduce((totalCost, current) => {
            const shippingCharges = current.shippingCharges || 0; // Ensure shippingCharges is not undefined or null
            const tax = current.tax || 0; // Ensure tax is not undefined or null
            return totalCost + shippingCharges + tax;
        }, 0);
        const marketingCost = Math.round(grossIncome * (30 / 100));
        const netMargin = grossIncome - marketingCost - discount - productionCost;
        console.log("Pro" + productionCost);
        const orderfullfilment = {
            processing: processOrderCount,
            shipped: shippingOrderCount,
            delievered: deliveredOrderCount
        };
        const categories = await getInventory({
            allCategories,
            productCount
        });
        const revenueDistribution = {
            GrossIncome: grossIncome,
            Marketing: marketingCost,
            Production: productionCost,
            Discount: discount,
            Profit: netMargin
        };
        const userAge = {
            kid: allUser.filter((i) => i.age < 20).length,
            adult: allUser.filter((i) => i.age > 18 && i.age < 50).length,
            old: allUser.filter((i) => i.age > 50).length
        };
        const Roles = {
            User: userRole,
            Admin: adminRole
        };
        charts = {
            orderfullfilment,
            categories,
            outOfStock,
            inStock: productCount - outOfStock,
            revenueDistribution,
            userAge,
            Roles
        };
        myCache.set(cacheKey, JSON.stringify(charts));
    }
    res.status(200).json({
        success: true,
        charts
    });
});
export const barChart = TryCatch(async (req, res, next) => {
    const cacheKey = "admin-bar-Charts";
    let charts;
    if (myCache.has(cacheKey))
        charts = JSON.parse(myCache.get(cacheKey));
    else {
        const today = new Date();
        const sixMonth = new Date();
        const sixMonthAgo = sixMonth.setMonth(sixMonth.getMonth() - 6);
        const twevleMonth = new Date();
        const twelveMonthAgo = twevleMonth.setMonth(twevleMonth.getMonth() - 12);
        const barChartProducts = Product.find({
            createdAt: {
                $gte: sixMonthAgo,
                $lte: today
            }
        }).select("createdAt");
        const sixMonthAgoUserPromise = User.find({
            createdAt: {
                $gte: sixMonthAgo,
                $lte: today
            }
        }).select("createdAt");
        const twe1veMonthAgoOrdersPromise = Order.find({
            createdAt: {
                $gte: twelveMonthAgo,
                $lte: today
            }
        }).select("createdAt");
        const [product, user, order] = await Promise.all([
            barChartProducts,
            sixMonthAgoUserPromise,
            twe1veMonthAgoOrdersPromise
        ]);
        const products = await getCounts({ today, length: 6, doc: product });
        const users = await getCounts({ today, length: 6, doc: user });
        const orders = await getCounts({ today, length: 12, doc: order });
        charts = {
            products,
            users,
            orders
        };
        myCache.set(cacheKey, JSON.stringify(charts));
    }
    res.status(200).json({
        success: true,
        charts
    });
});
export const lineChart = TryCatch(async (req, res, next) => {
    const cacheKey = "admin-line-Charts";
    let charts;
    if (myCache.has(cacheKey))
        charts = JSON.parse(myCache.get(cacheKey));
    else {
        const today = new Date();
        const twevleMonth = new Date();
        const twelveMonthAgo = twevleMonth.setMonth(twevleMonth.getMonth() - 12);
        const orderPromise = Order.find({
            createdAt: {
                $gte: twelveMonthAgo,
                $lte: today
            }
        });
        const userPromise = User.find({
            createdAt: {
                $gte: twelveMonthAgo,
                $lte: today
            }
        });
        const productPromise = Product.find({
            createdAt: {
                $gte: twelveMonthAgo,
                $lte: today
            }
        });
        const [product, user, order] = await Promise.all([
            productPromise,
            userPromise,
            orderPromise
        ]);
        const products = await getCounts({ today, length: 12, doc: product });
        const users = await getCounts({ today, length: 12, doc: user });
        const discount = await getCounts({ today, length: 12, doc: order, property: "discount" });
        const revenue = await getCounts({ today, length: 12, doc: order, property: "total" });
        charts = {
            products,
            users,
            discount,
            revenue
        };
        myCache.set(cacheKey, JSON.stringify(charts));
    }
    res.status(200).json({
        success: true,
        charts
    });
});
