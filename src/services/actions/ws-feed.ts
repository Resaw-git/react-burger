import {IFeed} from "../../utils/types";

export const WS_FEED_CONNECT: "WS_FEED_CONNECT" = "WS_FEED_CONNECT";
export const WS_FEED_OPEN: "WS_FEED_OPEN" = "WS_FEED_OPEN";
export const WS_FEED_CLOSE: "WS_FEED_CLOSE" = "WS_FEED_CLOSE";
export const WS_FEED_MESSAGE: "WS_FEED_MESSAGE" = "WS_FEED_MESSAGE";
export const WS_FEED_ERROR: "WS_FEED_ERROR" = "WS_FEED_ERROR";

interface IConnect {
    readonly type: typeof WS_FEED_CONNECT;
    payload: string; // url
}

interface IWsOpen {
    readonly type: typeof WS_FEED_OPEN;
}

interface IWsClose {
    readonly type: typeof WS_FEED_CLOSE;
}

interface IWsMessage {
    readonly type: typeof WS_FEED_MESSAGE;
    payload: IFeed;
}

interface IWsError {
    readonly type: typeof WS_FEED_ERROR;
    payload: string;
}

export type TFeedActions =
    | IConnect
    | IWsOpen
    | IWsClose
    | IWsMessage
    | IWsError
