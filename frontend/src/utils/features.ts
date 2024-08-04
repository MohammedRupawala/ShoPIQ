import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageResponse } from "../types/apiType";
import { NavigateFunction } from "react-router-dom";
import toast from "react-hot-toast";

type resType =
{
    data: messageResponse;
    error?: undefined;
} | {
    data?: undefined;
    error: FetchBaseQueryError | SerializedError;
}

export const resToast = (res:resType,navigate: NavigateFunction | null,url:string)=>{
    if("data" in res) {
        toast.success(res.data!.message)
        if(navigate) navigate(url)
        }
    else{
        const error = res.error  as FetchBaseQueryError
        const messageResponse = error.data as messageResponse
        toast.error(messageResponse.message)
    }
}
