import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/types";
import { newUserResponse } from "../../types/apiType";
import { server } from "../reducer/store";

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
export const {useLoginMutation} = userAPI