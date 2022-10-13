import {
    TFeedActions,
    WS_FEED_CLOSE,
    WS_FEED_CONNECT,
    WS_FEED_ERROR, WS_FEED_MESSAGE,
    WS_FEED_OPEN
} from "../actions/ws-feed";
import {IFeed} from "../../utils/types";

type TInitialState = {
    wsConnecting: boolean;
    wsConnect: boolean;
    data: IFeed;
    error: string;
}

const initialState = {
    wsConnecting: false,
    wsConnect: false,
    data: {
        orders: [],
        success: false,
        total: 0,
        totalToday: 0,
    },
    error: '',
};

export const wsFeedReducer = (state: TInitialState = initialState, action: TFeedActions): TInitialState => {
    switch (action.type) {
        case WS_FEED_CONNECT: {
            return {
                ...state,
                wsConnecting: true,
                wsConnect: false,
            }
        }
        case WS_FEED_OPEN: {
            return {
                ...state,
                wsConnecting: false,
                wsConnect: true,
            }
        }
        case WS_FEED_CLOSE: {
            return {
                ...state,
                wsConnecting: false,
                wsConnect: false,
                error: '',
            }
        }
        case WS_FEED_ERROR: {
            return {
                ...state,
                wsConnecting: false,
                wsConnect: false,
                error: action.payload,
            }
        }
        case WS_FEED_MESSAGE: {
            return {
                ...state,
                data: action.payload
            }
        }

        default:
            return state
    }
}