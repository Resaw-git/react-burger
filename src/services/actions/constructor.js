export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const TOTAL_SUM = "TOTAL_SUM";

export const addBun = (item) => {
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENT,

      item: item
    });
  };
};
