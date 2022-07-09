import { baseURL, orders } from "../api";
import { checkReponse } from "../check-response";
import { RESET_INGREDIENTS } from "./constructor";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const RESET_ORDER = "RESET_ORDER";

export const fetchOrder = (data) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    fetch(`${baseURL + orders}`, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        ingredients: data,
      }),
    })
      .then(checkReponse)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          number: res.order.number,
        });
      })
      .then(
        dispatch({
          type: RESET_INGREDIENTS,
        })
      )
      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(error);
      });
  };
};
