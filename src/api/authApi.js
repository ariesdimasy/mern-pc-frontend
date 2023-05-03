import axios from "axios";
import { apiUrl } from "../helpers";

export async function checkToken() {
  const authStorage = JSON.parse(localStorage.getItem("authStorage"));

  if (authStorage) {
    const result = await axios.get(apiUrl("user/check-token"), {
      headers: {
        token: "Bearer " + authStorage.token,
      },
    });
    if (!result.data.value) {
      localStorage.removeItem("authStorage");
    }
  }
}

export async function login(email, password) {
  return await axios.post(
    apiUrl("user/login"),
    {
      email: email,
      password: password,
    },
    {
      headers: "application/json",
    }
  );
}

export async function register(data) {
  return await axios.post(
    apiUrl("user/register"),
    {
      name: data.name,
      email: data.email,
      password: data.password,
      password_again: data.password_again,
      status: 1,
      authorization: "member",
    },
    { headers: "application/json" }
  );
}
