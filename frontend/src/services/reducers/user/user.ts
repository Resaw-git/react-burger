import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  JWT_EXPIRED,
  JWT_INVALID, EDIT_USER_SUCCESS, HIDE_EDIT_MESSAGE, TUserActions,
} from "../../actions/user";

type TInitialState = {
  userName: string;
  userEmail: string;
  userRequest: boolean;
  userSuccess: boolean;
  userFailed: boolean;
  jwtExpired: boolean;
  jwtInvalid: boolean;
  editSuccess: boolean;
}

export const initialState = {
  userName: "",
  userEmail: "",
  userRequest: false,
  userSuccess: false,
  userFailed: false,
  jwtExpired: false,
  jwtInvalid: false,
  editSuccess: false,
};

export const userReducer = (state: TInitialState = initialState, action: TUserActions) => {
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
        userFailed: false,
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
        userSuccess: false,
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
    case EDIT_USER_SUCCESS: {
      return {
        ...state,
        editSuccess: true
      }
    }
    case HIDE_EDIT_MESSAGE: {
      return {
        ...state,
        editSuccess: false
      }
    }
    default: {
      return state;
    }
  }
};
