import { Request,Response,NextFunction } from "express"

export interface userType  {
    name: string,
    photo : string,
    email:string,
    gender:string,
    _id:string,
    dob:Date

}


export type controllerType =  ( 
        req: Request,
        res: Response,
        next: NextFunction
    ) => Promise<void>
