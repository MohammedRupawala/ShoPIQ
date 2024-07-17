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
export type searchQuery = {
    search?:string,
    sort?:string,
    category?: string,
    price?:string,
    page?: string
}
export interface baseQuery {
    name?: {
        $regex : RegExp
    },
    price?:{
        $lte :number
        },
    category?:string,
}
export type invalidateCacheProps = {
    product?:boolean,
    order?:boolean,
    admin?:boolean
}