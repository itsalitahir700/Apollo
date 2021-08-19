import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        claimantDetails: {},
    },
    reducers: {
        GETCLAIMANTSUCCESS: (state, action) => {
            return {
                ...state,
                claimantDetails: action.payload,
            };
        },
        GETCLAIMANTERROR: (state, action) => {
            return {
                ...state,
                claimantDetails: {},
            };
        },
        PERFORMACTIONSUCCESS: (state, action) => {
            return {
                ...state,
                claimantDetails: action.payload,
            };
        },
        PERFORMACTIONERROR: (state, action) => {
            return {
                ...state,
                claimantDetails: {},
            };
        },
        COPYRTATOHIRESUCCESS: (state, action) => {
            return {
                ...state,
                claimantDetails: action.payload,
            };
        },
        COPYRTATOHIREERROR: (state, action) => {
            return {
                ...state,
                claimantDetails: {},
            };
        },
        COPYHIRETORTASUCCESS: (state, action) => {
            return {
                ...state,
                claimantDetails: action.payload,
            };
        },
        COPYHIRETORTAERROR: (state, action) => {
            return {
                ...state,
                claimantDetails: {},
            };
        },
    },
});

export const { GETCLAIMANTSUCCESS, GETCLAIMANTERROR, PERFORMACTIONSUCCESS, PERFORMACTIONERROR, COPYRTATOHIRESUCCESS, COPYRTATOHIREERROR, COPYHIRETORTASUCCESS, COPYHIRETORTAERROR } = slice.actions;
export default slice.reducer;
