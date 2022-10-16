import {PASSWORD_URL, RESET_URL} from "../api";
import { checkResponse } from "../check-response";
import {IForm} from "../../utils/types";
import {AppDispatch, AppThunk} from "../reducers/store";

export const SEND_EMAIL_REQUEST: "SEND_EMAIL_REQUEST" = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS: "SEND_EMAIL_SUCCESS" = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED: "SEND_EMAIL_FAILED" = "SEND_EMAIL_FAILED";

export const RESET_PASSWORD_REQUEST: "RESET_PASSWORD_REQUEST" = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED: "RESET_PASSWORD_FAILED" = "RESET_PASSWORD_FAILED";


export interface ISendEmailRequestAction {
    readonly type: typeof SEND_EMAIL_REQUEST;
}

export interface ISendEmailSuccessAction {
    readonly type: typeof SEND_EMAIL_SUCCESS;
    message: string;
}

export interface ISendEmailFailedAction {
    readonly type: typeof SEND_EMAIL_FAILED;
    message: string;
}

export interface IResetPasswordRequestAction {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordSuccessAction {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
    message: string;
}

export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_FAILED;
    message: string;
}

export type TResetPasswordActions =
    | ISendEmailRequestAction
    | ISendEmailSuccessAction
    | ISendEmailFailedAction
    | IResetPasswordRequestAction
    | IResetPasswordSuccessAction
    | IResetPasswordFailedAction;

export const sendEmail = (form: IForm): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: SEND_EMAIL_REQUEST,
    });
    fetch(`${RESET_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: form.email,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_EMAIL_SUCCESS,
              message: res.message
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: SEND_EMAIL_FAILED,
            message: error.message
        });
        console.log(error);
      });
};

export const resetPassword = (form: IForm): AppThunk => (dispatch: AppDispatch) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        fetch(`${PASSWORD_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                password: form.password,
                token: form.token
            }),
        })
            .then(checkResponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                        message: res.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: RESET_PASSWORD_FAILED,
                    message: error.message
                });
                console.log(error);
            });
    };
