import express from "express";
import { adminMiddleware } from "../middlewares/adminAuth.js";
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder,updateOrder } from "../controllers/orders.js";
const app = express.Router();
app.post("/new",newOrder)
app.get("/myorders",myOrders)
app.get("/allorders",adminMiddleware,allOrders)
app.route("/:id").get(getSingleOrder).put(adminMiddleware,updateOrder).delete(adminMiddleware,deleteOrder)
export default app;