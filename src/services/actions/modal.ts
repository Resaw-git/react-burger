import {RESET_ORDER} from "./order";
import {AppDispatch} from "../reducers/store";

export const MODAL_OPEN = "MODAL_OPEN" as const;
export const MODAL_CLOSE = "MODAL_CLOSE" as const;
export const MOBILE_OPEN = "MOBILE_OPEN" as const;
export const MOBILE_CLOSE = "MOBILE_CLOSE" as const;

export interface IModalOpenAction {
    readonly type: typeof MODAL_OPEN;
    isDetails: boolean;
}

export interface IMobileCloseAction {
    readonly type: typeof MOBILE_CLOSE;
}
export interface IMobileOpenAction {
    readonly type: typeof MOBILE_OPEN;
}

export interface IModalCloseAction {
    readonly type: typeof MODAL_CLOSE;
}

export type TModalActions =
    | IModalOpenAction
    | IModalCloseAction
    | IMobileCloseAction
    | IMobileOpenAction;

export const closeModal = (dispatch: AppDispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
}

export const closeMobile = (dispatch: AppDispatch) => {
    dispatch({
        type: MOBILE_CLOSE
    })
}

export const openMobile = (dispatch: AppDispatch) => {
    dispatch({
        type: MOBILE_OPEN
    })
}

export const closeModalOrd = (dispatch: AppDispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
    dispatch({
        type: RESET_ORDER,
    });
};