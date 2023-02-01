import {initialState, loginReducer} from "./login";
import {GET_LOGIN_FAILED, GET_LOGIN_REQUEST, GET_LOGIN_SUCCESS} from "../../actions/login";
import {describe, expect, test} from '@jest/globals';

describe("Check login reducer", () => {
    test("Should return initial state", () => {
        expect(loginReducer(undefined, {} as any)).toEqual(
            initialState
        );
    });

    test("Should return state of request", () => {
        expect(
            loginReducer(initialState, { type: GET_LOGIN_REQUEST })
        ).toEqual({...initialState, loginRequest: true});
    });

    test("Should return failed state request", () => {
        expect(
            loginReducer(initialState, { type: GET_LOGIN_FAILED, message: "some error message" })
        ).toEqual({
            ...initialState,
            loginMessage: "some error message",
            loginRequest: false,
            loginSuccess: false,
            loginFailed: true
        });
    });

    test("Should return success state request", () => {
        expect(
            loginReducer(initialState, { type: GET_LOGIN_SUCCESS })
        ).toEqual({...initialState,
            loginMessage: "",
            loginRequest: false,
            loginSuccess: true,
            loginFailed: false,
        });
    });
});