import express from "express";
import {allUsers, deleteUser, getUser, newUser} from "../controllers/user.js"
import { adminMiddleware } from "../middlewares/adminAuth.js";
const app = express.Router();
app.post("/new",newUser)
app.get("/all",adminMiddleware,allUsers)
app.get("/:id",getUser)
app.delete("/:id",adminMiddleware,deleteUser)
export default app;