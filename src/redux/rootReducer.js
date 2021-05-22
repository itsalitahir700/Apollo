import { combineReducers } from "redux";
import profileSlice from "./slices/profileSlice";
import authenticationSlice from "./slices/authenticationSlice";
import menuSlice from "./slices/menuSlice";

export default combineReducers({
  profileSlice,
  authenticationSlice,
  menuSlice,
});
