import { GET_ORDER } from "../actions/order";

const initialState = {
  orderNumber: '',
};

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ORDER: {
        return {
          ...state,
          orderNumber: '012345'
        };
      }
      default: {
        return state;
      }
    }
  };