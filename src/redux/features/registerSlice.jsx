import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    firstName: "",
    lastName: "",
    email:"",
    password:"",
};

const registerSlice = createSlice({
    name:"registerInfo",
    initialState: initialStates,
    reducers: {
        registerInformations: (state, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.email = action.payload.email
            state.password = action.payload.password
        },
        afterRegister: (state) => {
            delete state.password;
        }
    }
})

export const { registerInformations, afterRegister } = registerSlice.actions;
export default registerSlice.reducer