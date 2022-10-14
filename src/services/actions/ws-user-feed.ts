import {IFeed} from "../../utils/types";

export const WS_USER_FEED_CONNECT: "WS_USER_FEED_CONNECT" = "WS_USER_FEED_CONNECT";
export const WS_USER_FEED_OPEN: "WS_USER_FEED_OPEN" = "WS_USER_FEED_OPEN";
export const WS_USER_FEED_CLOSE: "WS_USER_FEED_CLOSE" = "WS_USER_FEED_CLOSE";
export const WS_USER_FEED_MESSAGE: "WS_USER_FEED_MESSAGE" = "WS_USER_FEED_MESSAGE";
export const WS_USER_FEED_ERROR: "WS_USER_FEED_ERROR" = "WS_USER_FEED_ERROR";

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

export type TUserFeedActions =
    | IConnect
    | IWsOpen
    | IWsClose
    | IWsMessage
    | IWsError