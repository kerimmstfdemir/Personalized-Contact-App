import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/loginInfoSlice";

//! CREATING
const store = configureStore({
    reducer:{
        loginInfo: loginReducer
    }
})

export default store;