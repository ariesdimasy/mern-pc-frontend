import { FETCH_PRODUCTS, FETCH_DETAIL_PRODUCT } from "./productTypes";
import { getAllProducts, getDetailProduct } from "./../../api/productApi";

export function fetchProducts(params) {
  return async function (dispatch, state) {
    const res = await getAllProducts(params);
    dispatch({
      type: FETCH_PRODUCTS,
      payload: {
        products: res.data.data.rows,
        pageCount: res.data.pagination.pageCount,
      },
    });
  };
}

export function fetchDetailProduct(id) {
  return async function (dispatch, state) {
    const res = await getDetailProduct(id);
    dispatch({
      type: FETCH_DETAIL_PRODUCT,
      payload: {
        product: res.data.data,
      },
    });
  };
}
