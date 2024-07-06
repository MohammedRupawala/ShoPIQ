import  express from "express";
import userRoute from "./routes/user.js"
import { connectDB } from "./utils/features.js";
const app = express();
const  port = 3000;
app.use(express.json())
connectDB();
app.get("/",(req,res)=>{
    res.send("Hello This is Test  Server")
})
app.use("/api/v1/user",userRoute)
app.listen(port);