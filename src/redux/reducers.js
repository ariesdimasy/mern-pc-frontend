import { combineReducers } from "redux";

import productReducer from "./product/productReducer";
import authReducer from "./auth/authReducer";

export default combineReducers({ productReducer, authReducer });
