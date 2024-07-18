import express from "express";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/order.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
config({
    path: "./.env"
});
export const myCache = new NodeCache();
const app = express();
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || " ";
app.use(express.json());
app.use(morgan("dev"));
connectDB(mongoURI);
app.get("/", (req, res) => {
    res.send("Hello This is Test  Server");
});
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order/", orderRoutes);
app.use("/uploads", express.static("upload"));
app.use(errorMiddleware);
app.listen(port);
