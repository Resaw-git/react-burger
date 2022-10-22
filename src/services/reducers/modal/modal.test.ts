import {initialState, modalReducer} from "./modal";
import {MODAL_CLOSE, MODAL_OPEN} from "../../actions/modal";

describe("Check modal reducer", () => {
  // test("Should return initial state", () => {
  //   expect(modalReducer(undefined, {})).toEqual(initialState);
  // });

  test("Should return modal open state", () => {
    expect(
      modalReducer(initialState, { type: MODAL_OPEN, isDetails: true })
    ).toEqual({ ...initialState, modalOpen: true, isDetails: true });
  });

  test("Should return modal close state", () => {
    expect(
      modalReducer(initialState, { type: MODAL_CLOSE })
    ).toEqual({ ...initialState, modalOpen: false });
  });
});
