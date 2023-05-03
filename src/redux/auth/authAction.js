import { AUTH_LOGIN, AUTH_REGISTER } from "./authTypes";
import { login, register } from "./../../api/authApi";
import { redirect } from "../../helpers";

export function authLogin(email, password) {
  return async function (dispatch, getState) {
    getState().loading = true;
    const res = await login(email, password);
    dispatch({
      type: AUTH_LOGIN,
      payload: {
        loading: false,
      },
    });
    localStorage.setItem("authStorage", JSON.stringify(res.data.data));
    if (
      res.data.data.authorization === "admin" ||
      res.data.data.authorization === "superadmin"
    ) {
      redirect("/admin-dashboard");
    } else {
      redirect("/");
    }
  };
}

export function authRegister(data) {
  return async function (dispatch, getState) {
    getState().loading = true;
    const res = await register({
      name: data.name,
      email: data.email,
      password: data.password,
      password_again: data.password_again,
    });
    dispatch({
      type: AUTH_REGISTER,
      payload: {
        loading: false,
        success: true,
      },
    });
  };
}
