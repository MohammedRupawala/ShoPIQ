import { Request,Response,NextFunction } from "express";
import { User } from "../models/user.js";
import { userType } from "../types/type.js";
import errorHandler from "../utils/utilClass.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch (
    async(req: Request<{},{},userType>,res: Response,next: NextFunction)=>{
        
         
         const {
             name,
             email,
             photo,
             _id,
             dob,
             gender
         } = req.body;
         let  user =  await User.findById(_id);
         if(user){
           return res.status(200).json({
                success:true,
                message:`Loged IN,Welcome,${user.name}`
            })
         }

          if(!_id || !name || !email || !photo || !dob || !gender ){
            return next(new errorHandler("User is  Not Created,InSufficient Details",400))
         }
         const sameId = await User.findById({_id})
          if(sameId){
            return next(new errorHandler("Already Signed In",401))
            // res.status(400).json({
            //     success:false,
            //     message:"Email Already Exists"
            //    })
         }
          user =await  User.create({
             name,
             email,
             photo,
             _id,
             dob:new Date(dob),
             gender,
         })
         res.status(201).json({
             success : true,
             message :  `User created , Welcome ${user.name}`
     
         })
        
     
     }
)

 export const allUsers = TryCatch(async (req,res,next)=>{
    const users = await User.find({})
    res.status(200).json({
        success:true,
        users
    })

})
export const getUser = TryCatch(async (req,res,next)=>{
    const id = req.params.id;
    const users = await User.findById(id)
    if(!users){
        return next(new errorHandler("Invalid ID",400))
    }
     res.status(200).json({
        success:true,
        users
    })

})

export const deleteUser = TryCatch(
    async (req,res,next)=>{
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user){
            return next(new errorHandler("Invalid ID",400))
        }
        await user.deleteOne()
         res.status(200).json({
            success:true,
            message : "User Delete Successfully"
        })

    }
)