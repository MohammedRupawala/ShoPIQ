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
    admin?:boolean,
    userId?:string,
    orderId?:string
    productId?:string | string[]
}
export type orderItemsType =  {
    name :string,
    photo : string,
    quantity : number,
    price : number,
    productId :string
}
export type shippingInfoType =  {
    address :string,
    city : string,
    state : string
    country : string,
    pincode : number,
}
export interface newOrderBody {
    shippingInfo : shippingInfoType,
    subtotal:number,
    shippingCharges : 0,
    tax : number,
    discount : 0,
    total : number,
    user : string,
    orderItems : orderItemsType[]
}

// export type cachingProps = {
//     key:string,
//     element : any
// }