import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "profileSlice",
  initialState: {
    loading: true,
    profileData: null,
    compnayData: null,
    jobsData: null,
    jobsFreshData: null,
    usersData: null,
    usersFreshData: null,
    singleCompanyData: null,
  },
  reducers: {
    CREATE_PROFILE_SUCCESS: (state, action) => {
      return {
        ...state,
        profileData: action.payload,
        loading: false,
      };
    },
    CREATE_PROFILE_ERROR: (state, action) => {
      return {
        ...state,
        profileData: "ERROR",
        loading: false,
      };
    },
    EDIT_PROFILE_SUCCESS: (state, action) => {
      return {
        ...state,
        profileData: action.payload,
        loading: false,
      };
    },
    EDIT_PROFILE_ERROR: (state, action) => {
      return {
        ...state,
        profileData: "ERROR",
        loading: false,
      };
    },
    GET_COMPANYDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        compnayData: action.payload,
        loading: false,
      };
    },
    GET_COMPANYDATA_ERROR: (state, action) => {
      return {
        ...state,
        compnayData: "ERROR",
        loading: false,
      };
    },
    POST_JOBSDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        jobsData: action.payload,
        loading: false,
      };
    },
    POST_JOBSFRESHDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        jobsFreshData: action.payload,
        loading: false,
      };
    },
    POST_USERSFRESHDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        usersFreshData: action.payload,
        loading: false,
      };
    },
    POST_JOBSDATA_ERROR: (state) => {
      return {
        ...state,
        jobsData: "ERROR",
        loading: false,
      };
    },
    POST_JOBSEDITDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        jobsData: action.payload,
        loading: false,
      };
    },
    POST_JOBSEDITDATA_ERROR: (state) => {
      return {
        ...state,
        jobsData: "ERROR",
        loading: false,
      };
    },
    POST_USERSDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        usersData: action.payload,
        loading: false,
      };
    },
    POST_USERSDATA_ERROR: (state) => {
      return {
        ...state,
        usersData: "ERROR",
        loading: false,
      };
    },
    SET_SINGLECOMPANYDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        singleCompanyData: action.payload,
      };
    },
    SET_SINGLECOMPANYDATANULL_SUCCESS: (state) => {
      return {
        ...state,
        singleCompanyData: null,
      };
    },
    SET_SINGLECOMPANYJOBSDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        jobsData: action.payload,
      };
    },
    SET_SINGLECOMPANYUSERSSDATA_SUCCESS: (state, action) => {
      return {
        ...state,
        usersData: action.payload,
      };
    },
    SET_FRESHUSERSJOBSINITIALSTATE_SUCCESS: (state, action) => {
      return {
        ...state,
        jobsFreshData: null,
        usersFreshData: null,
      };
    },
  },
});

export const {
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  GET_COMPANYDATA_SUCCESS,
  GET_COMPANYDATA_ERROR,
  POST_JOBSDATA_SUCCESS,
  POST_JOBSDATA_ERROR,
  POST_JOBSEDITDATA_SUCCESS,
  POST_JOBSEDITDATA_ERROR,
  POST_USERSDATA_SUCCESS,
  POST_USERSDATA_ERROR,
  SET_SINGLECOMPANYDATA_SUCCESS,
  SET_SINGLECOMPANYDATANULL_SUCCESS,
  SET_SINGLECOMPANYJOBSDATA_SUCCESS,
  POST_JOBSFRESHDATA_SUCCESS,
  SET_SINGLECOMPANYUSERSSDATA_SUCCESS,
  POST_USERSFRESHDATA_SUCCESS,
  SET_FRESHUSERSJOBSINITIALSTATE_SUCCESS,
} = slice.actions;
export default slice.reducer;
