import {IIngredient} from "../../utils/types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const ADD_BUN: "ADD_BUN" = "ADD_BUN";
export const REORDER_INGREDIENT: "REORDER_INGREDIENT" = "REORDER_INGREDIENT";
export const RESET_INGREDIENTS: "RESET_INGREDIENTS" = "RESET_INGREDIENTS";

export interface IAddIngredientAction {
    readonly type: typeof ADD_INGREDIENT;
    item: IIngredient;
}

export interface IDeleteIngredientAction {
    readonly type: typeof DELETE_INGREDIENT;
    id: string;
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