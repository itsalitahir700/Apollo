import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        notes: {},
    },
    reducers: {
        GETNOTESSUCCESS: (state, action) => {
            return {
                ...state,
                notes: action.payload,
            };
        },
        GETNOTESERROR: (state, action) => {
            return {
                ...state,
                notes: {},
            };
        },
    },
});

export const { GETNOTESSUCCESS, GETNOTESERROR } = slice.actions;
export default slice.reducer;
