export type OrderItemType = {
    name:string
    photo: string
    price: number
    _id:string
    quantity:number
}
export type OrderType = {
    name:string
    address:string
    pinCode:number
    status : "Process" | "shipped" | "delivered"
    subTotal :number
    discount : number
    shipping:number
    tax:number
    total:number
    orderItem: OrderItemType[]
    _id:string
}