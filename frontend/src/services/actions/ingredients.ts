import {INGREDIENTS_URL} from "../api";
import { checkResponse } from "../check-response";
import {IIngredient} from "../../utils/types";
import {AppDispatch, AppThunk} from "../reducers/store";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST" as const;
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS" as const;
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED" as const;

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IIngredient[];
}

export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED
}


export type TIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailed;


export const fetchIngredients = (): AppThunk =>
   (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(INGREDIENTS_URL)
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(error);
      });
};
