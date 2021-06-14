import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        documents: {},
    },
    reducers: {
        GETDOCUMENTSSUCCESS: (state, action) => {
            return {
                ...state,
                documents: action.payload,
            };
        },
        GETDOCUMENTSERROR: (state, action) => {
            return {
                ...state,
                documents: {},
            };
        },
    },
});

export const { GETDOCUMENTSSUCCESS, GETDOCUMENTSERROR } = slice.actions;
export default slice.reducer;
