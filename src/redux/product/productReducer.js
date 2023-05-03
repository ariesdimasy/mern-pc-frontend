import {
  FETCH_PRODUCTS,
  FETCH_DETAIL_PRODUCT,
  POST_COMMENT,
  INSERT_PRODUCT,
  UPDATE_PRODUCT,
  EMPTY_PRODUCT,
  DELETE_PRODUCT,
} from "./productTypes";

const initialState = {
  products: [],
  product: {},
  pageCount: 0,
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload.products,
        pageCount: action.payload.pageCount,
      };
    case FETCH_DETAIL_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
      };
    case POST_COMMENT:
      return {
        ...state,
      };
    case INSERT_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
      };
    case EMPTY_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
      };
    default:
      return state;
  }
}
