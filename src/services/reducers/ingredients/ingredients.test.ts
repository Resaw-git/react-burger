import {ingredientsReducer, initialState} from "./ingredients";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../../actions/ingredients";
import { testIngredient } from "../../../utils/test-data"

describe("Check ingredients reducer", () => {
    test("Should return initial state", () => {
        expect(ingredientsReducer(undefined, {} as any)).toEqual(
            initialState
        );
    });

    test("Should return state of request", () => {
        expect(
            ingredientsReducer(initialState, { type: GET_INGREDIENTS_REQUEST })
        ).toEqual({...initialState, ingredientsRequest: true, ingredientsFailed: false});
    });

    test("Should return failed state request", () => {
        expect(
            ingredientsReducer(initialState, { type: GET_INGREDIENTS_FAILED })
        ).toEqual({...initialState, ingredientsRequest: false, ingredientsFailed: true});
    });

    test("Should return success state request", () => {
        expect(
            ingredientsReducer(initialState, { type: GET_INGREDIENTS_SUCCESS, ingredients: [testIngredient] })
        ).toEqual({...initialState, ingredientsRequest: false, ingredientsFailed: false, ingredientsArray: [testIngredient]});
    });
});
