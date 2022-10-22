import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients/ingredients";
import { constructorReducer } from "./constructor/constructor";
import { modalReducer } from "./modal/modal";
import { orderReducer } from "./order/order";
import { registerReducer } from "./register/register";
import { loginReducer } from "./login/login";
import { userReducer } from "./user/user";
import { passwordReducer } from "./reset-password/reset-password";
import { wsFeedReducer } from "./ws-feed/ws-feed";
import {wsUserFeedReducer} from "./ws-user-feed/ws-user-feed";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorList: constructorReducer,
  modal: modalReducer,
  order: orderReducer,
  register: registerReducer,
  login: loginReducer,
  user: userReducer,
  reset: passwordReducer,
  feed: wsFeedReducer,
  userFeed: wsUserFeedReducer,
});
