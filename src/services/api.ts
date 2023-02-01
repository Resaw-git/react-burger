const BASE_URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = `${BASE_URL}/ingredients`; // для списка ингредиентов.
export const ORDERS_URL = `${BASE_URL}/orders`; // для номера заказа.
export const LOGIN_URL = `${BASE_URL}/auth/login`; // для авторизации.
export const USER_URL = `${BASE_URL}/auth/user`; // для данных пользователя.
export const REGISTER_URL = `${BASE_URL}/auth/register`; // для регистрации пользователя.
export const LOGOUT_URL = `${BASE_URL}/auth/logout`; // для выхода из системы.
export const TOKEN_URL = `${BASE_URL}/auth/token`; // для обновления токена.
export const RESET_URL = `${BASE_URL}/password-reset`; // для сброса пароля
export const PASSWORD_URL = `${BASE_URL}/password-reset/reset`; // для нового пароля

const BASE_WS_URL = "wss://norma.nomoreparties.space";
export const ALL_ORDERS_WS_URL = `${BASE_WS_URL}/orders/all`;
export const USER_ORDERS_WS_URL = `${BASE_WS_URL}/orders?token=`;
