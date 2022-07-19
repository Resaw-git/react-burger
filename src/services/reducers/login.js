import {
    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILED
} from "../actions/login"

const initialState = {
    loginMessage: "",
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
            };
        }
        case GET_LOGIN_SUCCESS: {
            return {
                ...state,
                loginMessage: "",
                loginRequest: false,
                loginSuccess: true,
            };
        }
        case GET_LOGIN_FAILED: {
            return {
                ...state,
                loginMessage: action.message,
                loginRequest: false,
                loginFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};
