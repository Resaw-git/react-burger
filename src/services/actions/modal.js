import {RESET_ORDER} from "./order";

export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";

export const closeModalIng = (dispatch, history) => {
    dispatch({
        type: MODAL_CLOSE,
    });
    history.goBack();
}

export const closeModalOrd = (dispatch) => {
    dispatch({
        type: MODAL_CLOSE,
    });
    dispatch({
        type: RESET_ORDER,
    });
};