import {RESET_ORDER} from "./order";
import {AppDispatch} from "../reducers/store";
import { History } from 'history';

export const MODAL_OPEN: "MODAL_OPEN" = "MODAL_OPEN";
export const MODAL_CLOSE: "MODAL_CLOSE" = "MODAL_CLOSE";

export interface IModalOpenAction {
    readonly type: typeof MODAL_OPEN;
}

export interface IModalCloseAction {
    readonly type: typeof MODAL_CLOSE;
}

export type TModalActions =
    | IModalOpenAction
    | IModalCloseAction;

export const closeModalIng = (dispatch: AppDispatch, history: History) => {
    dispatch({
        type: MODAL_CLOSE,
    });
    history.goBack();
}

export const closeModalOrd = (dispatch: AppDispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
    dispatch({
        type: RESET_ORDER,
    });
};