import express from "express";
import { adminMiddleware } from "../middlewares/adminAuth.js";
import { barChart, dashboardStats, lineChart, pieChart } from "../controllers/stats.js";
const app = express.Router();
app.get("/stats",adminMiddleware,dashboardStats)
app.get("/pie",adminMiddleware,pieChart)
app.get("/bar",adminMiddleware,barChart)
app.get("/line",adminMiddleware,lineChart)
export default app;