import {
    GET_REGISTER_REQUEST,
    GET_REGISTER_SUCCESS,
    GET_REGISTER_FAILED, TRegisterActions
} from "../actions/register"

type TInitialState = {
    registerMessage: string;
    registerRequest: boolean;
    registerSuccess: boolean;
    registerFailed: boolean;
}

const initialState = {
    registerMessage: "",
    registerRequest: false,
    registerSuccess: false,
    registerFailed: false,
};

export const registerReducer = (state: TInitialState = initialState, action: TRegisterActions) => {
    switch (action.type) {
        case GET_REGISTER_REQUEST: {
            return {
                ...state,
                registerRequest: true,
            };
        }
        case GET_REGISTER_SUCCESS: {
            return {
                ...state,
                registerMessage: action.message,
                registerRequest: false,
                registerSuccess: true,
            };
        }
        case GET_REGISTER_FAILED: {
            return {
                ...state,
                registerMessage: action.message,
                registerRequest: false,
                registerFailed: true,
            };
        }
        default: {
            return state;
        }
    }
};
