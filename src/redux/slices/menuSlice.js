import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "authenticationSlice",
  initialState: {
    moduleData: "",
    pageData: "",
    roleData: "",
  },
  reducers: {
    POST_MODULEDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        moduleData: action.payload,
      };
    },
    POST_MODULEDATA_ERROR: (state) => {
      return {
        ...state,
        moduleData: "",
      };
    },
    POST_PAGEDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        pageData: action.payload,
      };
    },
    POST_PAGEDATA_ERROR: (state) => {
      return {
        ...state,
        pageData: "",
      };
    },
    POST_ROLEDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        roleData: action.payload,
      };
    },
    POST_ROLEDATA_ERROR: (state) => {
      return {
        ...state,
        roleData: "",
      };
    },
  },
});

export const {
  POST_MODULEDATA_SUCCESS,
  POST_MODULEDATA_ERROR,
  POST_PAGEDATA_SUCCESS,
  POST_PAGEDATA_ERROR,
  POST_ROLEDATA_SUCCESS,
  POST_ROLEDATA_ERROR,
} = slice.actions;
export default slice.reducer;
