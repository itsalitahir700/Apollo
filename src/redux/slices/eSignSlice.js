import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "authenticationSlice",
    initialState: {
        eFields: {},
    },
    reducers: {
        GETEFIELDSSUCCESS: (state, action) => {
            return {
                ...state,
                eFields: action.payload,
            };
        },
        GETEFIELDSERROR: (state) => {
            return {
                ...state,
                eFields: {},
            };
        },
    },
});

export const { GETEFIELDSSUCCESS, GETEFIELDSERROR } = slice.actions;
export default slice.reducer;
