import { MODAL_OPEN, MODAL_CLOSE } from "../actions/modal";

const initialState = {
  modalOpen: false,
  modalData: [],
  header: "",
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_OPEN: {
      return {
        ...state,
        modalOpen: true,
        modalData: action.item,
        header: action.header,
      };
    }
    case MODAL_CLOSE: {
      return {
        ...state,
        modalOpen: false,
        modalData: [],
        header: "",
      };
    }
    default: {
      return state;
    }
  }
};
