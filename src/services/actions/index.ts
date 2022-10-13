import {TConstructorActions} from "./constructor";
import {TIngredientsActions} from "./ingredients";
import {TLoginActions} from "./login";
import {TModalActions} from "./modal";
import {TOrderActions} from "./order";
import {TRegisterActions} from "./register";
import {TResetPasswordActions} from "./reset-password";
import {TUserActions} from "./user";
import {TFeedActions} from "./ws-feed";

export type TApplicationActions =
    | TConstructorActions
    | TIngredientsActions
    | TLoginActions
    | TModalActions
    | TOrderActions
    | TRegisterActions
    | TResetPasswordActions
    | TUserActions
    | TFeedActions;