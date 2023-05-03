import axios from "axios";
import { apiUrl } from "../helpers";
const authStorage = JSON.parse(localStorage.getItem("authStorage"));

export async function getAllCategory(params, headers = {}) {
  return await axios.get(
    apiUrl(`category`),
    {
      params: params,
    },
    { headers: headers }
  );
}

export async function categoryDetail(id, headers = {}) {
  return await axios.get(apiUrl(`category/${id}`), { headers: headers });
}

export async function addCategory(data, headers = {}) {
  return await axios.post(apiUrl(`category`), data, {
    headers: {
      ...headers,
      token: "Bearer " + authStorage.token,
    },
  });
}

export async function updateCategory(id, data, headers = {}) {
  return await axios.put(apiUrl(`category/${id}`), data, {
    headers: {
      ...headers,
      token: "Bearer " + authStorage.token,
    },
  });
}

export async function deleteCategory(id, headers = {}) {
  return await axios.delete(apiUrl(`category/${id}`), {
    headers: {
      ...headers,
      token: "Bearer " + authStorage.token,
    },
  });
}
