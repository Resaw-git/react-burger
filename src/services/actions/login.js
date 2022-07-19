import {baseURL, login} from "../api";
import { checkReponse } from "../check-response";
import { setCookie } from "../cookies";

export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED";

export const authentication = (form, dispatch) => {
    dispatch({
        type: GET_LOGIN_REQUEST,
    });
    fetch(`${baseURL + login}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password,
        })
    })
        .then(checkReponse)
        .then((res) => {
            if(res && res.success) {
                setCookie("accessToken", res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                dispatch({
                    type: GET_LOGIN_SUCCESS,
                });
                console.log(res)
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
