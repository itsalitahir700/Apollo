import {
  postProfile,
  getCompanyData,
  postEditProfile,
} from "../../services/ProfileRegister";
import { postJobs, postEditJobs } from "../../services/JobsRegister";
import { postUsers } from "../../services/UsersRegister";
import {
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_ERROR,
  GET_COMPANYDATA_SUCCESS,
  POST_JOBSDATA_SUCCESS,
  POST_JOBSDATA_ERROR,
  POST_USERSDATA_SUCCESS,
  POST_USERSDATA_ERROR,
  SET_SINGLECOMPANYDATA_SUCCESS,
  SET_SINGLECOMPANYJOBSDATA_SUCCESS,
  POST_JOBSEDITDATA_SUCCESS,
  POST_JOBSEDITDATA_ERROR,
  POST_JOBSFRESHDATA_SUCCESS,
  SET_SINGLECOMPANYUSERSSDATA_SUCCESS,
  POST_USERSFRESHDATA_SUCCESS,
  SET_FRESHUSERSJOBSINITIALSTATE_SUCCESS,
} from "../slices/profileSlice";

export const ProfileRegisterAction = (profileData) => async (dispatch) => {
  const { data } = await postProfile(profileData);
  if (data !== false) {
    dispatch(CREATE_PROFILE_SUCCESS(data));
  } else {
    dispatch(CREATE_PROFILE_ERROR(data));
  }
};

export const ProfileRegisterEditAction = (profileData) => async (dispatch) => {
  const { data } = await postEditProfile(profileData);
  if (data !== false) {
    dispatch(EDIT_PROFILE_SUCCESS(data));
  } else {
    dispatch(EDIT_PROFILE_ERROR(data));
  }
};

export const GetCompanyDataAction = () => async (dispatch) => {
  const { data } = await getCompanyData();
  dispatch(GET_COMPANYDATA_SUCCESS(data));
  return data;
};

export const PostJobsAction = (jobsData) => async (dispatch) => {
  const res = await postJobs(jobsData);
  if (res !== false) {
    const { data } = res;
    dispatch(POST_JOBSDATA_SUCCESS(data));
  } else {
    const { data } = res;
    dispatch(POST_JOBSDATA_ERROR(data));
  }
};

export const PostJobsFreshAction = (jobsData) => async (dispatch) => {
  const res = await postJobs(jobsData);
  if (res !== false) {
    const { data } = res;
    dispatch(POST_JOBSFRESHDATA_SUCCESS(data));
  } else {
    return false;
  }
};

export const PostEditJobsAction = (jobsData) => async (dispatch) => {
  const res = await postEditJobs(jobsData);
  if (res !== false) {
    const { data } = res;
    dispatch(POST_JOBSEDITDATA_SUCCESS(data));
  } else {
    const { data } = res;
    dispatch(POST_JOBSEDITDATA_ERROR(data));
  }
};

export const PostUsersAction = (userData) => async (dispatch) => {
  const res = await postUsers(userData);
  if (res !== false) {
    const { data } = res;
    dispatch(POST_USERSDATA_SUCCESS(data));
  } else {
    const { data } = res;
    dispatch(POST_USERSDATA_ERROR(data));
  }
};

export const PostUsersFreshAction = (userData) => async (dispatch) => {
  const res = await postUsers(userData);
  if (res !== false) {
    const { data } = res;
    dispatch(POST_USERSFRESHDATA_SUCCESS(data));
  } else {
    return false;
  }
};

export const SetSingleCompanyDataAction = (data) => async (dispatch) => {
  dispatch(SET_SINGLECOMPANYDATA_SUCCESS(data));
};

export const SetFreshUsersJobsDataNullLAction = () => async (dispatch) => {
  dispatch(SET_FRESHUSERSJOBSINITIALSTATE_SUCCESS());
};

export const SetSingleJobsCompanyDataAction = (data) => async (dispatch) => {
  dispatch(SET_SINGLECOMPANYJOBSDATA_SUCCESS(data));
};

export const SetSingleUsersCompanyDataAction = (data) => async (dispatch) => {
  dispatch(SET_SINGLECOMPANYUSERSSDATA_SUCCESS(data));
};
