import { api, ingredients } from "../api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const fetchIngredients = () => {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    fetch(`${api}${ingredients}`)
    .then((res) => {
      return res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`)
    })
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data,
          
        });
      })
      .catch((error) => {
        dispatch({
            type: GET_INGREDIENTS_FAILED
          });
          console.log(error)
      });
  };
};
