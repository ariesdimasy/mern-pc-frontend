import {
  FETCH_PRODUCTS,
  FETCH_DETAIL_PRODUCT,
  POST_COMMENT,
  INSERT_PRODUCT,
  UPDATE_PRODUCT,
  EMPTY_PRODUCT,
  DELETE_PRODUCT,
} from "./productTypes";
import {
  getAllProducts,
  getDetailProduct,
  commentingProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "./../../api/productApi";

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
      type: EMPTY_PRODUCT,
      payload: {
        product: {},
      },
    });
    dispatch({
      type: FETCH_DETAIL_PRODUCT,
      payload: {
        product: res.data.data,
      },
    });
  };
}

export function createProduct(data) {
  return async function (dispatch, state) {
    const res = await insertProduct(data);
    dispatch({
      type: INSERT_PRODUCT,
      payload: {
        product: res.data,
      },
    });
    dispatch(fetchProducts());
  };
}

export function setEmptyProduct() {
  return {
    type: EMPTY_PRODUCT,
    payload: {
      product: {},
    },
  };
}

export function updateProductProcess(productId, data) {
  return async function (dispatch, state) {
    const res = await updateProduct(productId, data);

    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        product: res.data,
      },
    });
    dispatch(fetchProducts());
  };
}

export function deleteProductProcess(productId) {
  return async function (dispatch, state) {
    const res = await deleteProduct(productId);

    dispatch({
      type: DELETE_PRODUCT,
      payload: {
        product: res.data,
      },
    });
  };
}

export function postComment(productId, comment) {
  return async function (dispatch, state) {
    await commentingProduct(productId, comment);
    dispatch({
      type: POST_COMMENT,
    });
    dispatch(fetchDetailProduct(productId));
  };
}
