import {RESET_ORDER} from "./order";
import {AppDispatch} from "../reducers/store";

export const MODAL_OPEN: "MODAL_OPEN" = "MODAL_OPEN";
export const MODAL_CLOSE: "MODAL_CLOSE" = "MODAL_CLOSE";

export interface IModalOpenAction {
    readonly type: typeof MODAL_OPEN;
    isDetails: boolean;
}

export interface IModalCloseAction {
    readonly type: typeof MODAL_CLOSE;
}

export type TModalActions =
    | IModalOpenAction
    | IModalCloseAction;

export const closeModal = (dispatch: AppDispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
}

export const closeModalOrd = (dispatch: AppDispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
    dispatch({
        type: RESET_ORDER,
    });
};