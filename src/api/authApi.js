import axios from "axios";

export async function login(email, password) {
  return await axios.post(
    "http://localhost:4500/user/login",
    {
      email: email,
      password: password,
    },
    {
      headers: "application/json",
    }
  );
}
