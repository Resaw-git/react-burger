import {
    EDIT_USER_SUCCESS,
    GET_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    HIDE_EDIT_MESSAGE,
    JWT_EXPIRED,
    JWT_INVALID,
} from "../../actions/user";
import {initialState, userReducer} from "./user";

describe("Check password reducer", () => {
  test("Should return initial state", () => {
      expect(userReducer(undefined, {} as any)).toEqual(initialState)
  })

  test("Should return state of user request", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      userRequest: true,
    });
  });

  test("Should return state of user failed request", () => {
    expect(
      userReducer(
        {
          ...initialState,
          userName: "lenin",
          userEmail: "lenin@ya.ru",
        },
        {
          type: GET_USER_FAILED,
        }
      )
    ).toEqual({
      ...initialState,
      userName: "",
      userEmail: "",
      userRequest: false,
      userSuccess: false,
      userFailed: true,
    });
  });

  test("Should return state of user success request", () => {
    expect(
      userReducer(initialState, {
        type: GET_USER_SUCCESS,
        userName: "petya",
        userEmail: "pet@ya.ru",
      })
    ).toEqual({
      ...initialState,
      userName: "petya",
      userEmail: "pet@ya.ru",
      userRequest: false,
      userSuccess: true,
      userFailed: false,
      jwtExpired: false,
      jwtInvalid: false,
    });
  });

  test("Should return state of jwt expired", () => {
    expect(
      userReducer(
        {
          ...initialState,
          userName: "petya",
          userEmail: "pet@ya.ru",
        },
        {
          type: JWT_EXPIRED,
        }
      )
    ).toEqual({
      ...initialState,
      userName: "",
      userEmail: "",
      userRequest: false,
      userFailed: true,
      jwtExpired: true,
    });
  });

  test("Should return state of jwt invalid", () => {
    expect(
      userReducer(
        {
          ...initialState,
          userName: "petya",
          userEmail: "pet@ya.ru",
        },
        {
          type: JWT_INVALID,
        }
      )
    ).toEqual({
      ...initialState,
      userName: "",
      userEmail: "",
      userRequest: false,
      userFailed: true,
      jwtExpired: false,
      jwtInvalid: true,
    });
  });

  test("Should return state of edit user success", () => {
    expect(
      userReducer(initialState, {
        type: EDIT_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      editSuccess: true,
    });
  });

  test("Should return state of hide edit message", () => {
    expect(
      userReducer(initialState, {
        type: HIDE_EDIT_MESSAGE,
      })
    ).toEqual({
      ...initialState,
      editSuccess: false,
    });
  });
});
