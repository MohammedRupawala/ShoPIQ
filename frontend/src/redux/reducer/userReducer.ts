import { createSlice } from "@reduxjs/toolkit";
import { userReducerIntialState } from "../../types/reducer-types";
const initialState :userReducerIntialState  =  {
    user : null,
    loading : true
}

export const userReducer  = createSlice({
    name : "userReducer",
    initialState,
    reducers:{
        userNotExist : (state)=>{
            state.loading = false,
            state.user = null
        },

        userExist : (state,action)=>{
            state.loading = false,
            state.user = action.payload
        }
    }
})


export const {userExist,userNotExist}  = userReducer.actions
export default userReducer.reducer