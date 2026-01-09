import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import userReducer from "./userSlice"
import postReducer from "./postSlice";
import commentReducer from "./commentSlice"
import doctorReducer from "./doctorSlicer"

export const store = configureStore({
    reducer:{
       auth:authReducer,  
       userDetail:userReducer,
       post:postReducer,
       comment:commentReducer,
       doctor:doctorReducer
    }
   

})