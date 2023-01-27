import {MODAL_OPEN, MODAL_CLOSE, MOBILE_CLOSE, MOBILE_OPEN, TModalActions} from "../../actions/modal";

type TInitialState = {
  modalOpen: boolean;
  mobileMenu: boolean;
  isDetails: boolean;
}

export const initialState = {
  mobileMenu: false,
  modalOpen: false,
  isDetails: false,
};

export const modalReducer = (state: TInitialState = initialState, action: TModalActions) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalOpen: true,
        isDetails: action.isDetails
      };
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        modalOpen: false,
      };
    }
    case MOBILE_CLOSE: {
      return {
        ...state,
        mobileMenu: false,
      };
    }
    case MOBILE_OPEN: {
      return {
        ...state,
        mobileMenu: true,
      };
    }
    default: {
      return state;
    }
  }
};
