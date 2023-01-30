import {RESET_ORDER} from "./order";
import {AppDispatch} from "../reducers/store";

export const MODAL_OPEN = "MODAL_OPEN" as const;
export const MODAL_CLOSE = "MODAL_CLOSE" as const;
export const MOBILE_MENU_OPEN = "MOBILE_MENU_OPEN" as const;
export const MOBILE_MENU_CLOSE = "MOBILE_MENU_CLOSE" as const;
export const MOBILE_MODAL_OPEN = "MOBILE_MODAL_OPEN" as const;
export const MOBILE_MODAL_CLOSE = "MOBILE_MODAL_CLOSE" as const;

export interface IModalOpenAction {
    readonly type: typeof MODAL_OPEN;
    isDetails: boolean;
}

export interface IMobileMenuCloseAction {
    readonly type: typeof MOBILE_MENU_CLOSE;
}
export interface IMobileMenuOpenAction {
    readonly type: typeof MOBILE_MENU_OPEN;
}

export interface IMobileModalCloseAction {
    readonly type: typeof MOBILE_MODAL_CLOSE;
}
export interface IMobileModalOpenAction {
    readonly type: typeof MOBILE_MODAL_OPEN;
}

export interface IModalCloseAction {
    readonly type: typeof MODAL_CLOSE;
}

export type TModalActions =
    | IModalOpenAction
    | IModalCloseAction
    | IMobileMenuCloseAction
    | IMobileMenuOpenAction
    | IMobileModalCloseAction
    | IMobileModalOpenAction;

export const closeModal = (dispatch: AppDispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
}

export const closeMobileMenu = (dispatch: AppDispatch) => {
    dispatch({
        type: MOBILE_MENU_CLOSE
    })
}

export const openMobileMenu = (dispatch: AppDispatch) => {
    dispatch({
        type: MOBILE_MENU_OPEN
    })
}
export const closeMobileModal = (dispatch: AppDispatch) => {
    dispatch({
        type: MOBILE_MODAL_CLOSE
    })
}

export const openMobileModal = (dispatch: AppDispatch) => {
    dispatch({
        type: MOBILE_MODAL_OPEN
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