import {
  ADD_CATEGORY,
  CATEGORY_DETAIL,
  DELETE_CATEGORY,
  FETCH_CATEGORY,
  SET_CATEGORY_NAME,
  UPDATE_CATEGORY,
} from "./categoryTypes";

const initialState = {
  categories: [],
  category: undefined,
  categoryName: "",
  pageCount: 0,
};

export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORY:
      return {
        ...state,
        categories: action.payload.categories,
        pageCount: action.payload.pageCount,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case CATEGORY_DETAIL:
      return {
        ...state,
        category: action.payload.category,
      };
    case SET_CATEGORY_NAME:
      return {
        ...state,
        categoryName: action.payload.categoryName,
      };
    default:
      return state;
  }
}
