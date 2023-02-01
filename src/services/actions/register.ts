import { REGISTER_URL } from "../api";
import { checkResponse } from "../check-response";
import { getCookie } from "../cookies";
import { IForm } from "../../utils/types";
import { AppDispatch, AppThunk } from "../reducers/store";

export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST" as const;
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS" as const;
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED" as const;

export interface IGetRegisterRequestAction {
  readonly type: typeof GET_REGISTER_REQUEST;
}

export interface IGetRegisterSuccessAction {
  readonly type: typeof GET_REGISTER_SUCCESS;
  message: string;
}

export interface IGetRegisterFailedAction {
  readonly type: typeof GET_REGISTER_FAILED;
  message: string;
}

export type TRegisterActions = IGetRegisterRequestAction | IGetRegisterSuccessAction | IGetRegisterFailedAction;

export const registration =
  (form: IForm): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    fetch(REGISTER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      } as { [key: string]: string },
      body: JSON.stringify({
        name: form.name,
        password: form.password,
        email: form.email,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_REGISTER_SUCCESS,
            message: res.message,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_REGISTER_FAILED,
          message: error.message,
        });
        console.log(error);
      });
  };
