import {
  FETCH_CATEGORY,
  ADD_CATEGORY,
  CATEGORY_DETAIL,
  SET_CATEGORY_NAME,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from "./categoryTypes";
import {
  getAllCategory,
  addCategory,
  categoryDetail,
  updateCategory,
  deleteCategory,
} from "./../../api/categoryApi";

export function getAllCategories(params) {
  return async function (dispatch, getState) {
    const res = await getAllCategory(params);
    dispatch({
      type: FETCH_CATEGORY,
      payload: {
        categories: res.data.data.rows,
        pageCount: res.data.pagination.pageCount,
      },
    });
  };
}

export function addNewCategory(data) {
  return async function (dispatch, getState) {
    const res = await addCategory(data);
    dispatch({
      type: ADD_CATEGORY,
      payload: {
        category: res.data,
      },
    });
  };
}

export function getCategoryDetail(id) {
  return async function (dispatch, getState) {
    const res = await categoryDetail(id);
    dispatch({
      type: SET_CATEGORY_NAME,
      payload: {
        categoryName: res.data.data.categoryName,
      },
    });
    dispatch({
      type: CATEGORY_DETAIL,
      payload: {
        category: res.data,
      },
    });
  };
}

export function updateCategoryProcess(id, data) {
  return async function (dispatch, getState) {
    const res = await updateCategory(id, data);
    dispatch({
      type: UPDATE_CATEGORY,
      payload: {
        category: res.data,
      },
    });
    dispatch({
      type: CATEGORY_DETAIL,
      payload: {
        category: res.data,
      },
    });
  };
}

export function deleteCategoryProcess(id) {
  return async function (dispatch, getState) {
    const res = await deleteCategory(id);
    dispatch({
      type: DELETE_CATEGORY,
      payload: {
        category: res.data,
      },
    });
  };
}

export function setCategoryName(categoryName) {
  return {
    type: SET_CATEGORY_NAME,
    payload: {
      categoryName: categoryName,
    },
  };
}
