import { constructorReducer, initialState } from "./constructor";
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  REORDER_INGREDIENT,
  RESET_INGREDIENTS,
} from "../../actions/constructor";
import { testIngredient } from "../../../utils/test-data"

describe("Check constructor reducer", () => {
  test("Should return initial state", () => {
    expect(constructorReducer(undefined, { type: RESET_INGREDIENTS })).toEqual(
      initialState
    );
  });

  test("Should return state with bun", () => {
    const expectedState = {
      constructorBun: [testIngredient],
      constructorIng: [],
    };

    expect(
      constructorReducer(initialState, { type: ADD_BUN, item: testIngredient })
    ).toEqual(expectedState);
  });

  test("Should return state with ingredient", () => {
    const expectedState = {
      constructorBun: [],
      constructorIng: [testIngredient],
    };

    expect(
      constructorReducer(initialState, {
        type: ADD_INGREDIENT,
        item: testIngredient,
      })
    ).toEqual(expectedState);
  });

  test("Should return state with ingredient", () => {
    const expectedState = {
      constructorBun: [],
      constructorIng: [testIngredient],
    };

    expect(
      constructorReducer(initialState, {
        type: ADD_INGREDIENT,
        item: testIngredient,
      })
    ).toEqual(expectedState);
  });

  test("Should return state without deleted ingredient", () => {
    const currentState = {
      constructorBun: [],
      constructorIng: [testIngredient],
    };

    const expectedState = {
      constructorBun: [],
      constructorIng: [],
    };

    expect(
      constructorReducer(currentState, {
        type: DELETE_INGREDIENT,
        id: testIngredient.id,
      })
    ).toEqual(expectedState);
  });

  test("Should return state with reorder ingredients", () => {
    const testIngredient1 = {
        ...testIngredient, name: "testIngredient1"
    };
    const testIngredient2 = {
        ...testIngredient, name: "testIngredient2"
    };

    const currentState = {
      constructorBun: [],
      constructorIng: [testIngredient1, testIngredient2],
    };

    const expectedState = {
      constructorBun: [],
      constructorIng: [testIngredient2, testIngredient1],
    };

    expect(
      constructorReducer(currentState, {
        type: REORDER_INGREDIENT,
        hoverIndex: 1,
        dragIndex: 0,
      })
    ).toEqual(expectedState);
  });
});
