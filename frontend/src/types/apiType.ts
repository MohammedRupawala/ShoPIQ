import { User ,Product} from "./types"

export  interface messageResponse {
    success : boolean,
    message : string
}

export interface userResponse {
    users : User,
    success : boolean
}
export interface productResponse {
    products  : Product[],
    success : boolean
}
export interface categoriesResponse {
    success : boolean,
    categories : string[]
}

export interface searchResponse {
    success : boolean,
    products : Product[],
    totalPages : number
}

export type CustomError = {
    status : number,
    data : {
        message : string,
        success : true
    }
}