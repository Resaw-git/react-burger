import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
} from "../actions/user";

const initialState = {
  userName: "",
  userEmail: "",
  userRequest: false,
  userSuccess: false,
  userFailed: false,
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
    default: {
      return state;
    }
  }
};
