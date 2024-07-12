import { Request,Response,NextFunction } from "express"

export interface userType  {
    name: string,
    photo : string,
    email:string,
    gender:string,
    _id:string,
    dob:Date

}
export interface productType  {
    name : string,
    price : number,
    category : string,
    stock : number

}


export type controllerType =  ( 
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => Promise<void>
