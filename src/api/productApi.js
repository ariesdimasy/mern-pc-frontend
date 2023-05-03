import axios from "axios";
import { apiUrl } from "../helpers";

export async function getAllProducts(params, headers = {}) {
  return await axios.get(
    apiUrl(`product`),
    {
      params: params,
    },
    headers
  );
}

export async function getDetailProduct(id, headers = {}) {
  return await axios.get(apiUrl(`product/${id}`), headers);
}

export async function insertProduct(data, headers = {}) {
  const authStorage = JSON.parse(localStorage.getItem("authStorage"));
  return await axios.post(apiUrl(`product`), data, {
    headers: {
      token: "Bearer " + authStorage.token,
    },
  });
}

export async function updateProduct(id, data, headers = {}) {
  const authStorage = JSON.parse(localStorage.getItem("authStorage"));
  return await axios.put(apiUrl(`product/${id}`), data, {
    headers: {
      token: "Bearer " + authStorage.token,
    },
  });
}

export async function deleteProduct(id, headers = {}) {
  const authStorage = JSON.parse(localStorage.getItem("authStorage"));
  return await axios.delete(apiUrl(`product/${id}`), {
    headers: {
      token: "Bearer " + authStorage.token,
    },
  });
}

export async function commentingProduct(productId, comment) {
  const authStorage = JSON.parse(localStorage.getItem("authStorage"));

  const data = {
    product_id: productId,
    user_id: Number(authStorage.id),
    comment: comment,
  };

  return await axios.post(apiUrl(`comment`), data, {
    headers: {
      token: "Bearer " + authStorage.token,
    },
  });
}
