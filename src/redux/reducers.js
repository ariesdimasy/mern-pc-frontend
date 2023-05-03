import { combineReducers } from "redux";

import productReducer from "./product/productReducer";
import authReducer from "./auth/authReducer";
import categoryReducer from "./category/categoryReducer";

export default combineReducers({
  productReducer: productReducer,
  authReducer: authReducer,
  categoryReducer: categoryReducer,
});
