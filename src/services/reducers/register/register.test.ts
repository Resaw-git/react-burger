import {GET_REGISTER_FAILED, GET_REGISTER_REQUEST, GET_REGISTER_SUCCESS} from "../../actions/register";
import {initialState, registerReducer} from "./register";
import {describe, expect, test} from '@jest/globals';

describe("Check register reducer", () => {
  test("Should return initial state", () => {
      expect(registerReducer(undefined, {} as any)).toEqual(initialState)
  })

  test("Should return state of request", () => {
    expect(
      registerReducer(initialState, { type: GET_REGISTER_REQUEST })
    ).toEqual({ ...initialState, registerRequest: true });
  });

  test("Should return failed state request", () => {
    expect(
      registerReducer(initialState, {
        type: GET_REGISTER_FAILED,
        message: "some register message",
      })
    ).toEqual({
      ...initialState,
      registerRequest: false,
      registerFailed: true,
      registerMessage: "some register message",
    });
  });

  test("Should return success state request", () => {
    expect(
      registerReducer(initialState, {
        type: GET_REGISTER_SUCCESS,
        message: "some success message",
      })
    ).toEqual({
      ...initialState,
      registerRequest: false,
      registerSuccess: true,
      registerMessage: "some success message",
    });
  });
});
