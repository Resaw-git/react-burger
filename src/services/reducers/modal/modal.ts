import {MODAL_OPEN, MODAL_CLOSE, TModalActions} from "../../actions/modal";

type TInitialState = {
  modalOpen: boolean;
  isDetails: boolean;
}

export const initialState = {
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
    default: {
      return state;
    }
  }
};
