import { login } from "../../services/Auth";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../slices/authenticationSlice";
export const loginAction = (authData) => async (dispatch) => {
  const res = await login(authData);
  if (res.login === true) {
    localStorage.setItem("token", res.token);
    console.log("login action", JSON.stringify(res._nav));
    localStorage.setItem("nav", JSON.stringify(res._nav));
    dispatch(LOGIN_SUCCESS(res));
    return res;
  } else {
    dispatch(LOGIN_ERROR("Error"));
  }
};
