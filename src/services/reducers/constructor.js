import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  TOTAL_SUM,
} from "../actions/constructor";

const initialState = {
  list: {},
  totalSum: 0,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return Object.assign({}, state, {list: action.item})
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        list: {
          ...state.list.filter(
            (el, index) => index !== action.index
          ),
        },
      };
    }
    case TOTAL_SUM: {
      return {
        ...state,
        totalSum: {
          ...state.list.reduce(
            (accum, current) => accum + current.price, 0
          ),
        },
      };
    }
    default: {
      return state;
    }
  }
};


