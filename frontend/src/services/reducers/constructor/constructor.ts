import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
  REORDER_INGREDIENT,
  RESET_INGREDIENTS,
  TConstructorActions,
} from "../../actions/constructor";
import {IIngredient} from "../../../utils/types";

type TInitialState = {
  constructorBun: Array<IIngredient>;
  constructorIng: Array<IIngredient>;
}

export const initialState = {
  constructorBun: [],
  constructorIng: [],
};

export const constructorReducer = (state: TInitialState = initialState, action: TConstructorActions) => {
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
      data.splice(action.hoverIndex, 0, data.splice(action.dragIndex, 1)[0]);

      return {
        ...state,
        constructorIng: data,
      };
    }
    case RESET_INGREDIENTS: {
      return {
        ...state,
        constructorBun: [],
        constructorIng: [],
      };
    }
    default: {
      return state;
    }
  }
};
