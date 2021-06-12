import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        messages: {},
    },
    reducers: {
        GETMESSAGESSUCCESS: (state, action) => {
            return {
                ...state,
                messages: action.payload,
            };
        },
        GETMESSAGESERROR: (state, action) => {
            return {
                ...state,
                messages: {},
            };
        },
    },
});

export const { GETMESSAGESSUCCESS, GETMESSAGESERROR } = slice.actions;
export default slice.reducer;
