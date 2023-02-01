import {GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, RESET_ORDER} from "../../actions/order";
import {initialState, orderReducer} from "./order";
import {describe, expect, test} from '@jest/globals';


describe("Check order reducer", () => {
  test("Should return initial state", () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialState);
  });

  test("Should return state of request", () => {
    expect(orderReducer(initialState, { type: GET_ORDER_REQUEST })).toEqual({
      ...initialState,
      orderRequest: true,
    });
  });

  test("Should return failed state request", () => {
    expect(orderReducer(initialState, { type: GET_ORDER_FAILED })).toEqual({
      ...initialState,
      orderRequest: false,
      orderSuccess: false,
      orderFailed: true,
    });
  });

  test("Should return success state request", () => {
    expect(
      orderReducer(initialState, { type: GET_ORDER_SUCCESS, number: "123" })
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderSuccess: true,
      orderFailed: false,
      orderNumber: "123",
    });
  });

  test("Should return reset state", () => {
    expect(
      orderReducer(
        { ...initialState, orderSuccess: true, orderNumber: "123" },
        { type: RESET_ORDER }
      )
    ).toEqual({
      ...initialState,
      orderRequest: false,
      orderSuccess: false,
      orderFailed: false,
      orderNumber: "",
    });
  });
});
