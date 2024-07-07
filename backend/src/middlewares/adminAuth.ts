import { User } from "../models/user.js";
import errorHandler from "../utils/utilClass.js";
import { TryCatch } from "./error.js";

export const adminMiddleware = TryCatch( async(req,res,next)=>{
    const  {id} = req.query;
    if(!id){
        return next(new errorHandler("User not Loged In",401))
    }
    const user = await User.findById(id)
    if(!user){
        return next(new errorHandler("InValid ID",401))
    }
    if(user.role!=="admin"){
        return next(new errorHandler("User is Not Admin",401))
    }

    next()
})