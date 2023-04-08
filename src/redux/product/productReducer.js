import { FETCH_PRODUCTS, FETCH_DETAIL_PRODUCT } from "./productTypes";

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
    default:
      return state;
  }
}
