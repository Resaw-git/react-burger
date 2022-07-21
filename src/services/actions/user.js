import { baseURL, token, user, logout } from "../api";
import { checkResponse } from "../check-response";
import { deleteCookie, getCookie, setCookie } from "../cookies";

export const GET_USER_REQUEST = "GET_LOGIN_REQUEST";
export const GET_USER_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_USER_FAILED = "GET_LOGIN_FAILED";

export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS"
export const HIDE_EDIT_MESSAGE = "HIDE_EDIT_MESSAGE"

export const JWT_EXPIRED = "JWT_EXPIRED";
export const JWT_INVALID = "JWT_INVALID";

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
      .then(checkResponse)
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
        if (error.message === "jwt expired") {
          dispatch({
            type: JWT_EXPIRED,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
        console.log(error);
      });
  };
};

export const refreshToken = () => {
  return function (dispatch) {
    return fetch(`${baseURL + token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
      .then(checkResponse)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch(getUserData())
          console.log(res);
        }
      })
      .catch((error) => {
        if (error.message === "Token is invalid") {
          dispatch({
            type: JWT_INVALID,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
        console.log(error);
      });
  };
};

export const userLogout = () => {
  return function (dispatch) {
    return fetch(`${baseURL + logout}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    })
        .then(checkResponse)
        .then((res) => {
          if (res && res.success) {
            deleteCookie("accessToken");
            dispatch(getUserData())
            console.log(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };
};

export const editUserData = (form) => {
  return function (dispatch) {
    return fetch(`${baseURL + user}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email
      }),
    })
        .then(checkResponse)
        .then((res) => {
          if (res && res.success) {
            dispatch({
              type: EDIT_USER_SUCCESS
            })
            dispatch(getUserData())
          }
        })
        .catch((error) => {
          dispatch({
            type: GET_USER_FAILED,
          });
          console.log(error);
        });
  };
};

export const hideMessage = (dispatch) => {
  dispatch({
    type: HIDE_EDIT_MESSAGE
  })
}
