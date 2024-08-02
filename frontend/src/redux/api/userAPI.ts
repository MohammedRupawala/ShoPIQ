import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { newUserResponse, userResponse } from "../../types/apiType";
import { server } from "../store";
import axios from "axios";

export const userAPI = createApi({
  reducerPath:"userAPI",
  baseQuery : fetchBaseQuery({
    baseUrl : `${import.meta.env.VITE_SERVER}/api/v1/user/`
  }),
  endpoints:(builder)=>({
    login:builder.mutation<newUserResponse,User>({
      query : (user)=>({
        url : "new",
        method:"POST",
        body : user,
      })
    })
  })
})


export const getUser  = async(id : string)=>{
  try{
    const {data} : {data:userResponse} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/${id}`)
    return data
  }
  catch(error){
    throw error
  }
}
export const {useLoginMutation} = userAPI