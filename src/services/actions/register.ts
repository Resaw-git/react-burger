import {baseURL, register} from "../api";
import { checkResponse } from "../check-response";
import { getCookie } from "../cookies";

export const GET_REGISTER_REQUEST: "GET_REGISTER_REQUEST" = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS: "GET_REGISTER_SUCCESS" = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED: "GET_REGISTER_FAILED" = "GET_REGISTER_FAILED";

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

export type TRegisterActions =
    | IGetRegisterRequestAction
    | IGetRegisterSuccessAction
    | IGetRegisterFailedAction;

export const registration = (form: any, dispatch: any) => {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });

    fetch(`${baseURL + register}`, {
        method: "POST",
        // @ts-ignore
        headers: {
            "Content-Type": "application/json;charset=utf-8",
            authorization: getCookie("accessToken"),
        },
        body: JSON.stringify({
            name: form.name,
            password: form.password,
            email: form.email,
        })
    })
      .then(checkResponse)
      .then((res) => {
          if(res && res.success) {
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
