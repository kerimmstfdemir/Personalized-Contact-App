import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    loginInformation: false,
    email: "",
    password: false
};

const loginSlice = createSlice({
    name:"loginInfo",
    initialState: initialStates,
    reducers :{
        loginSuccess: (state, action) => {
            state.loginInformation = true;
            state.email = action.payload;
            state.password = action.password;  //?  if not get, use payload
        },
        loginUnsuccess: (state) => {
            state = initialStates;
        }
    }
})

export const { loginSuccess, loginUnsuccess } = loginSlice.actions;
export default loginSlice.reducer