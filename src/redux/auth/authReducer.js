import { AUTH_LOGIN } from "./authTypes";

const initialState = {
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}
