import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../actions/constructor";

const initialState = {
  list: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        list: [...state.list, action.item],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        list: [...state.list.filter((el) => el._id !== action.id)],
      };
    }
    default: {
      return state;
    }
  }
};
