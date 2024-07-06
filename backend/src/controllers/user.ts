import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.js";
import { userType } from "../types/type.js";

export const newUser = async(req: Request<{},{},userType>,res: Response,next: NextFunction)=>{
   try{
    const {
        name,
        email,
        photo,
        _id,
        dob,
        gender
    } = req.body;
    const user =await  User.create({
        name,
        email,
        photo,
        _id,
        dob,
        gender,
    })
    res.status(200).json({
        success : true,
        message :  `User created , Welcome ${user.name}`

    })
   }
   catch(error){
    res.json({
        message:"User Already Exists/User is Not Created"
    })
   }

}