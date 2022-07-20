import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  JWT_EXPIRED,
  JWT_INVALID,
} from "../actions/user";

const initialState = {
  userName: "",
  userEmail: "",
  userRequest: false,
  userSuccess: false,
  userFailed: false,
  jwtExpired: false,
  jwtInvalid: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userName: action.userName,
        userEmail: action.userEmail,
        userRequest: false,
        userSuccess: true,
        jwtExpired: false,
        jwtInvalid: false,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userName: "",
        userEmail: "",
        userRequest: false,
        userFailed: true,
      };
    }
    case JWT_EXPIRED: {
      return {
        ...state,
        userName: "",
        userEmail: "",
        userRequest: false,
        userFailed: true,
        jwtExpired: true,
      };
    }
    case JWT_INVALID: {
      return {
        ...state,
        userName: "",
        userEmail: "",
        userRequest: false,
        userFailed: true,
        jwtExpired: false,
        jwtInvalid: true,
      };
    }
    default: {
      return state;
    }
  }
};
