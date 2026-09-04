import {
  MODAL_OPEN,
  MODAL_CLOSE,
  MOBILE_MENU_CLOSE,
  MOBILE_MENU_OPEN,
  MOBILE_MODAL_CLOSE,
  MOBILE_MODAL_OPEN,
  TModalActions,
} from "../../actions/modal";

type TInitialState = {
  modalOpen: boolean;
  mobileMenu: boolean;
  mobileModal: boolean;
  isDetails: boolean;
};

export const initialState = {
  mobileMenu: false,
  mobileModal: false,
  modalOpen: false,
  isDetails: false,
};

export const modalReducer = (state: TInitialState = initialState, action: TModalActions) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalOpen: true,
        isDetails: action.isDetails,
      };
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        modalOpen: false,
      };
    }
    case MOBILE_MENU_CLOSE: {
      return {
        ...state,
        mobileMenu: false,
      };
    }
    case MOBILE_MENU_OPEN: {
      return {
        ...state,
        mobileMenu: true,
      };
    }
    case MOBILE_MODAL_CLOSE: {
      return {
        ...state,
        mobileModal: false,
      };
    }
    case MOBILE_MODAL_OPEN: {
      return {
        ...state,
        mobileModal: true,
      };
    }
    default: {
      return state;
    }
  }
};
