import {baseURL, register} from "../api";
import { checkReponse } from "../check-response";
import { getCookie } from "../cookies";

export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED";

export const registration = (form, dispatch) => {
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    fetch(`${baseURL + register}`, {
        method: "POST",
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
      .then(checkReponse)
      .then((res) => {
          if(res && res.success) {
              dispatch({
                  type: GET_REGISTER_SUCCESS,
                  message: res.message,
              });
              console.log(res)
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
