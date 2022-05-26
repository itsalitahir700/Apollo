import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        loginData: "",
        token: localStorage.getItem("token"),
        nav: localStorage.getItem("nav"),
        directIntroducer: localStorage.getItem("directIntroducer"),
        loggedInApollo: localStorage.getItem("loggedInApollo"),
    },
    reducers: {
        LOGIN_SUCCESS: (state, action) => {
            return {
                ...state,
                loginData: action.payload,
                token: localStorage.getItem("token"),
                nav: localStorage.getItem("nav"),
                loggedInApollo: localStorage.getItem("loggedInApollo"),
                directIntroducer: localStorage.getItem("directIntroducer"),
            };
        },
        LOGIN_ERROR: (state) => {
            return {
                ...state,
                loginData: "",
                token: "",
                nav: "",
                loggedInApollo: "",
            };
        },
    },
});

export const { LOGIN_SUCCESS, LOGIN_ERROR } = slice.actions;
export default slice.reducer;
