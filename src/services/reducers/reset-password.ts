import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED, TResetPasswordActions,
} from "../actions/reset-password";

type TInitialState = {
  message: string;
  sendRequest: boolean;
  sendSuccess: boolean;
  sendFailed: boolean;
  resetRequest: boolean;
  resetSuccess: boolean;
  resetFailed: boolean;
}

const initialState = {
  message: "",
  sendRequest: false,
  sendSuccess: false,
  sendFailed: false,
  resetRequest: false,
  resetSuccess: false,
  resetFailed: false,
};

export const passwordReducer = (state: TInitialState = initialState, action: TResetPasswordActions) => {
  switch (action.type) {
    case SEND_EMAIL_REQUEST: {
      return {
        ...state,
        sendRequest: true,
      };
    }
    case SEND_EMAIL_SUCCESS: {
      return {
        ...state,
        sendRequest: false,
        sendSuccess: true,
        message: action.message,
      };
    }
    case SEND_EMAIL_FAILED: {
      return {
        ...state,
        sendRequest: false,
        sendFailed: true,
        message: action.message,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
        resetSuccess: true,
        message: action.message,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetRequest: false,
        resetFailed: true,
        message: action.message,
      };
    }
    default: {
      return state;
    }
  }
};
