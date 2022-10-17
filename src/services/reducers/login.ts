import {
    GET_LOGIN_REQUEST,
    GET_LOGIN_SUCCESS,
    GET_LOGIN_FAILED,
    TLoginActions,
} from "../actions/login"

type TInitialState = {
    loginMessage: string;
    loginRequest: boolean;
    loginSuccess: boolean;
    loginFailed: boolean;
}

const initialState = {
    loginMessage: "",
    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,
};

export const loginReducer = (state: TInitialState = initialState, action: TLoginActions) => {
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
                loginFailed: false,
            };
        }
        case GET_LOGIN_FAILED: {
            return {
                ...state,
                loginMessage: action.message,
                loginRequest: false,
                loginSuccess: false,
                loginFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};
