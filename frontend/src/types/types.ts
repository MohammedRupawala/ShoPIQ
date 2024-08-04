export type User = {
    email : string,
    name : string,
    _id : string,
    photo : string,
    dob:string,
    gender : string,
    role : string

}

export type Product = {
    name : string,
    _id : string,
    photo : string,
    price : number,
    stock : number,
    category  : string
}

export type searchProductQueryType = {
    search : string,
    price : number,
    page : number,
    sort : string,
    category : string
}

export  type newProductType = {
    id: string,
    formData ?: FormData
}
export type updateProductType = {
    id:string,
    productId:string,
    formData:FormData
}
export type deleteProductType = {
    id:string,
    productId:string,
}
