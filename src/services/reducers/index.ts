import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { modalReducer } from "./modal";
import { orderReducer } from "./order";
import { registerReducer } from "./register";
import { loginReducer } from "./login";
import { userReducer } from "./user";
import { passwordReducer } from "./reset-password";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorList: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  reset: passwordReducer,
});
