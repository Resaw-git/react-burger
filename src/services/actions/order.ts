import { ORDERS_URL } from "../api";
import { checkResponse } from "../check-response";
import { RESET_INGREDIENTS } from "./constructor";
import { getCookie } from "../cookies";
import { AppDispatch, AppThunk } from "../reducers/store";

export const GET_ORDER_REQUEST: "GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS: "GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";
export const SET_USER_SUCCESS: "SET_USER_SUCCESS" = "SET_USER_SUCCESS";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  number: string;
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IResetOrderAction {
  readonly type: typeof RESET_ORDER;
}

export interface ISetUserSuccessAction {
  readonly type: typeof SET_USER_SUCCESS;
  userAccess: boolean;
}

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IResetOrderAction
  | ISetUserSuccessAction;

export const fetchOrder = (data: string[]): AppThunk =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(`${ORDERS_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "authorization": getCookie("accessToken"),
      } as { [key: string]: string },
      body: JSON.stringify({
        ingredients: data,
      }),
    })
      .then(checkResponse)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          number: res.order.number,
        });
        dispatch({
          type: RESET_INGREDIENTS,
        })
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(error);
      });
};
