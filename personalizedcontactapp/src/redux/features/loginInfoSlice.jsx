import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    loginInformation: false,
    email: "",
    password: false,
    userInfo:{}
};

const loginSlice = createSlice({
    name:"loginInfo",
    initialState: initialStates,
    reducers :{
        loginInfos: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        loginSuccess:(state, action) => {
            state.loginInformation = true
            state.userInfo = action.payload.userInfo
            delete state.password
        },
        loginUnsuccess: (state) => {
            state = initialStates;
        }
    }
})

export const { loginInfos, loginSuccess, loginUnsuccess } = loginSlice.actions;
export default loginSlice.reducer