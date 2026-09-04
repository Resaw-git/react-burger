import {LOGIN_URL} from "../api";
import { checkResponse } from "../check-response";
import { setCookie } from "../cookies";
import { AppDispatch, AppThunk } from "../reducers/store";
import { IForm } from "../../utils/types";

export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST" as const;
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS" as const;
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED" as const;

export interface IGetLoginRequestAction {
  readonly type: typeof GET_LOGIN_REQUEST;
}

export interface IGetLoginSuccessAction {
  readonly type: typeof GET_LOGIN_SUCCESS;
}

export interface IGetLoginFailedAction {
  readonly type: typeof GET_LOGIN_FAILED;
  message: string;
}

export type TLoginActions =
  | IGetLoginRequestAction
  | IGetLoginSuccessAction
  | IGetLoginFailedAction;

export const autorization = (form: IForm): AppThunk => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_LOGIN_REQUEST,
  });
  fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res && res.success) {
        setCookie("accessToken", res.accessToken, undefined);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: GET_LOGIN_SUCCESS,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: GET_LOGIN_FAILED,
        message: error.message,
      });
      console.log(error);
    });
};
