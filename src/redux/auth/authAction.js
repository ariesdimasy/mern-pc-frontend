import { AUTH_LOGIN } from "./authTypes";
import { login } from "./../../api/authApi";

export function authLogin(email, password) {
  return async function (dispatch, getState) {
    getState().loading = true;
    const res = await login(email, password);
    dispatch({
      type: AUTH_LOGIN,
      payload: {
        authStorage: res.data,
        loading: false,
      },
    });
    localStorage.setItem("authStorage", JSON.stringify(res.data.data));
  };
}
