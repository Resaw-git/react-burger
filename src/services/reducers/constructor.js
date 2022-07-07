import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
  REORDER_INGREDIENT,
} from "../actions/constructor";

const initialState = {
  constructorBun: [],
  constructorIng: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        constructorBun: [action.item],
      };
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        constructorIng: [...state.constructorIng, action.item],
      };
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorIng: [
          ...state.constructorIng.filter((el) => el.id !== action.id),
        ],
      };
    }
    case REORDER_INGREDIENT: {
      const data = [...state.constructorIng];
      data.splice(action.hoverIndex , 0, data.splice(action.dragIndex, 1)[0]);

      return {
        ...state,
        constructorIng: data
      };
    }
    default: {
      return state;
    }
  }
};
