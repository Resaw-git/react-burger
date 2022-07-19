import { baseURL, user } from "../api";
import { checkReponse } from "../check-response";
import { getCookie } from "../cookies";

export const GET_USER_REQUEST = "GET_LOGIN_REQUEST";
export const GET_USER_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_USER_FAILED = "GET_LOGIN_FAILED";

export const getUserData = () => {
    return function (dispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        });
        fetch(`${baseURL + user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                authorization: getCookie("accessToken"),
            },
        })
            .then(checkReponse)
            .then((res) => {
                if (res && res.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        userName: res.user.name,
                        userEmail: res.user.email,
                    });

                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_FAILED,
                });
                console.log(error);
            });
    }
};
