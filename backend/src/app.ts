import  express from "express";
import userRoute from "./routes/user.js"
import productRoute from "./routes/products.js"
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";

export const myCache = new NodeCache()
const app = express();
const  port = 4000;
app.use(express.json())
connectDB();
app.get("/",(req,res)=>{
    res.send("Hello This is Test  Server")
})
app.use("/api/v1/user",userRoute)
app.use("/api/v1/product",productRoute)
app.use("/uploads",express.static("upload"))
app.use(errorMiddleware)
app.listen(port);