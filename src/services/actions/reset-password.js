import { baseURL, reset, password } from "../api";
import { checkResponse } from "../check-response";

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILED = "SEND_EMAIL_FAILED";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const sendEmail = (form) => {
  return function (dispatch) {
    dispatch({
      type: SEND_EMAIL_REQUEST,
    });
    fetch(`${baseURL + reset}`, {
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
};

export const resetPassword = (form) => {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST,
        });
        fetch(`${baseURL + password}`, {
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
}
