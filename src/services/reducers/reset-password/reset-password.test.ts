import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_EMAIL_FAILED,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
} from "../../actions/reset-password";
import {initialState, passwordReducer} from "./reset-password";

describe("Check password reducer", () => {
  test("Should return initial state", () => {
      expect(passwordReducer(undefined, {} as any)).toEqual(initialState)
  })

  test("Should return state of reset password request", () => {
    expect(
      passwordReducer(initialState, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual({
      ...initialState,
      resetRequest: true,
    });
  });

  test("Should return state of reset password failed", () => {
    expect(
      passwordReducer(initialState, {
        type: RESET_PASSWORD_FAILED,
        message: "some failed message",
      })
    ).toEqual({
      ...initialState,
      resetRequest: false,
      resetFailed: true,
      message: "some failed message",
    });
  });

  test("Should return state of reset password success", () => {
    expect(
      passwordReducer(initialState, {
        type: RESET_PASSWORD_SUCCESS,
        message: "some success message",
      })
    ).toEqual({
      ...initialState,
      resetRequest: false,
      resetSuccess: true,
      message: "some success message",
    });
  });

  test("Should return state of send email request", () => {
    expect(
      passwordReducer(initialState, {
        type: SEND_EMAIL_REQUEST,
      })
    ).toEqual({
      ...initialState,
      sendRequest: true,
    });
  });

  test("Should return state of send email failed", () => {
    expect(
      passwordReducer(initialState, {
        type: SEND_EMAIL_FAILED,
        message: "some failed message"
      })
    ).toEqual({
      ...initialState,
      sendRequest: false,
      sendFailed: true,
      message: "some failed message",
    });
  });

  test("Should return state of send email success", () => {
    expect(
      passwordReducer(initialState, {
        type: SEND_EMAIL_SUCCESS,
        message: "some success message"
      })
    ).toEqual({
      ...initialState,
      sendRequest: false,
      sendSuccess: true,
      message: "some success message",
    });
  });
});
