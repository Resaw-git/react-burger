import { IFeed } from "../../utils/types";
import { USER_ORDERS_WS_URL } from "../api";
import { getCookie } from "../cookies";
import { AppDispatch } from "../reducers/store";

export const WS_USER_FEED_CONNECT = "WS_USER_FEED_CONNECT" as const;
export const WS_USER_FEED_OPEN = "WS_USER_FEED_OPEN" as const;
export const WS_USER_FEED_CLOSE = "WS_USER_FEED_CLOSE" as const;
export const WS_USER_FEED_MESSAGE = "WS_USER_FEED_MESSAGE" as const;
export const WS_USER_FEED_ERROR = "WS_USER_FEED_ERROR" as const;

interface IConnect {
  readonly type: typeof WS_USER_FEED_CONNECT;
  payload: string; // url
}

interface IWsOpen {
  readonly type: typeof WS_USER_FEED_OPEN;
}

interface IWsClose {
  readonly type: typeof WS_USER_FEED_CLOSE;
}

interface IWsMessage {
  readonly type: typeof WS_USER_FEED_MESSAGE;
  payload: IFeed;
}

interface IWsError {
  readonly type: typeof WS_USER_FEED_ERROR;
  payload: string;
}

export type TUserFeedActions = IConnect | IWsOpen | IWsClose | IWsMessage | IWsError;

export const connectWsUserFeed = (dispatch: AppDispatch) => {
  const token = getCookie("accessToken");
  const accessToken = token?.replace(/Bearer /, "");

  dispatch({
    type: WS_USER_FEED_CONNECT,
    payload: `${USER_ORDERS_WS_URL}${accessToken}`,
  });
};

export const disconnectWsUserFeed = (dispatch: AppDispatch) => {
  dispatch({ type: WS_USER_FEED_CLOSE });
};
