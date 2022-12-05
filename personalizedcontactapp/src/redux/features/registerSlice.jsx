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
            state.firstName = action.firstName
            state.lastName = action.lastName
            state.email = action.email
            state.password = action.password
        },
        afterRegister: (state) => {
            state = initialStates;
        }
    }
})

export const { registerInformations, afterRegister } = registerSlice.actions;
export default registerSlice.reducer