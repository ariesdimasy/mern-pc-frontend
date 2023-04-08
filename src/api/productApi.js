import axios from "axios";

export async function getAllProducts(params, headers = {}) {
  return await axios.get(
    `http://localhost:4500/product`,
    {
      params: params,
    },
    headers
  );
}

export async function getDetailProduct(id, headers = {}) {
  return await axios.get(`http://localhost:4500/product/${id}`, headers);
}
