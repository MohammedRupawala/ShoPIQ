import { User } from "./types"

export  interface newUserResponse {
    success : boolean,
    message : string
}

export interface userResponse {
    users : User,
    success : boolean
}