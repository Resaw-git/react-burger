import {MODAL_OPEN, MODAL_CLOSE, TModalActions} from "../actions/modal";

type TInitialState = {
  modalOpen: boolean;
}

const initialState = {
  modalOpen: false,
};

export const modalReducer = (state: TInitialState = initialState, action: TModalActions) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalOpen: true,
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
