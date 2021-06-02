import { combineReducers } from "redux";
import profileSlice from "./slices/profileSlice";
import authenticationSlice from "./slices/authenticationSlice";
import menuSlice from "./slices/menuSlice";
import claimantSlice from "./slices/claimantSlice";

export default combineReducers({
    profileSlice,
    authenticationSlice,
    menuSlice,
    claimantSlice,
});
