import { AUTH_LOGIN, AUTH_REGISTER } from "./authTypes";

const initialState = {
  loading: false,
  success: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case AUTH_REGISTER:
      return {
        ...state,
        loading: action.payload.loading,
        success: action.payload.success,
      };
    default:
      return state;
  }
}
