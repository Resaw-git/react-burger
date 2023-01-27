import {IIngredient} from "../../utils/types";
import {AppDispatch} from "../reducers/store";

export const ADD_INGREDIENT = "ADD_INGREDIENT" as const;
export const DELETE_INGREDIENT = "DELETE_INGREDIENT" as const;
export const ADD_BUN = "ADD_BUN" as const;
export const REORDER_INGREDIENT = "REORDER_INGREDIENT" as const;
export const RESET_INGREDIENTS = "RESET_INGREDIENTS" as const;

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    item: IIngredient;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    id: string | undefined;
}

export interface IAddBunAction {
    readonly type: typeof ADD_BUN;
    item: IIngredient;
}

export interface IReorderIngredientAction {
    readonly type: typeof REORDER_INGREDIENT
    hoverIndex: number;
    dragIndex: number;
}

export interface IResetIngredientsAction {
    readonly type: typeof RESET_INGREDIENTS
}

export type TConstructorActions =
    | IAddIngredientAction
    | IDeleteIngredientAction
    | IAddBunAction
    | IReorderIngredientAction
    | IResetIngredientsAction;

export const addBun = (item: IIngredient, dispatch: AppDispatch) => {
    dispatch({
        type: ADD_BUN,
        item: item
    })
};

export const addIngredient = (item: IIngredient, dispatch: AppDispatch) => {
    dispatch({
        type: ADD_INGREDIENT,
        item: item
    })
};