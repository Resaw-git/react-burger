import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED, RESET_ORDER, TOrderActions
} from "../../actions/order";

type TInitialState = {
  orderNumber: string;
  orderRequest: boolean;
  orderSuccess: boolean;
  orderFailed: boolean;
  userAccess: boolean;
}

export const initialState = {
  orderNumber: "",
  orderRequest: false,
  orderSuccess: false,
  orderFailed: false,
  userAccess: false
};

export const orderReducer = (state: TInitialState = initialState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: true,
        orderFailed: false,
        orderNumber: action.number,
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: false,
        orderFailed: true,
      };
    }
    case RESET_ORDER: {
      return {
        ...state,
        orderRequest: false,
        orderSuccess: false,
        orderFailed: false,
        orderNumber: "",
      };
    }
    default: {
      return state;
    }
  }
};
