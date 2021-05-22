import { postModule, postPage } from "../../services/Module";
import { postRole } from "../../services/Role";
import {
  POST_MODULEDATA_SUCCESS,
  POST_MODULEDATA_ERROR,
  POST_PAGEDATA_SUCCESS,
  POST_PAGEDATA_ERROR,
  POST_ROLEDATA_SUCCESS,
  POST_ROLEDATA_ERROR,
} from "../slices/menuSlice";

export const PostMenuAction = (profileData) => async (dispatch) => {
  const { data } = await postModule(profileData);
  if (data !== false) {
    dispatch(POST_MODULEDATA_SUCCESS(data));
  } else {
    dispatch(POST_MODULEDATA_ERROR(data));
  }
};

export const PostPageAction = (profileData) => async (dispatch) => {
  const { data } = await postPage(profileData);
  if (data !== false) {
    dispatch(POST_PAGEDATA_SUCCESS(data));
  } else {
    dispatch(POST_PAGEDATA_ERROR(data));
  }
};

export const PostRoleAction = (profileData) => async (dispatch) => {
  const { data } = await postRole(profileData);
  if (data !== false) {
    dispatch(POST_ROLEDATA_SUCCESS(data));
  } else {
    dispatch(POST_ROLEDATA_ERROR(data));
  }
};
