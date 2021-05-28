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
    },
});

export const { GETCLAIMANTSUCCESS, GETCLAIMANTERROR } = slice.actions;
export default slice.reducer;
