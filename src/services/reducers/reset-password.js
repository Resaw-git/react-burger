import {
    RESET_PASSWORD
} from "../actions/reset-password"

const initialState = {
    email: ""
};

export const passwordReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_PASSWORD: {
            return {
                ...state,
                email: action.email
            }
        }
        default: {
            return state;
        }
    }
};
