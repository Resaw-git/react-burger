import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
import { rootReducer } from "./index";
import { WS_FEED_CONNECT, WS_FEED_OPEN, WS_FEED_CLOSE, WS_FEED_ERROR, WS_FEED_MESSAGE} from "../actions/ws-feed";
import { WS_USER_FEED_CONNECT, WS_USER_FEED_OPEN, WS_USER_FEED_CLOSE, WS_USER_FEED_ERROR, WS_USER_FEED_MESSAGE} from "../actions/ws-user-feed";
import { TApplicationActions } from "../actions"
import { socketMiddleware } from "../middleware/socket-middleware";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const wsFeedActions = {
    wsConnect: WS_FEED_CONNECT ,
    onOpen: WS_FEED_OPEN,
    onClose: WS_FEED_CLOSE,
    onError: WS_FEED_ERROR,
    onMessage: WS_FEED_MESSAGE,
}

const wsUserFeedActions = {
    wsConnect: WS_USER_FEED_CONNECT,
    onOpen: WS_USER_FEED_OPEN,
    onClose: WS_USER_FEED_CLOSE,
    onError: WS_USER_FEED_ERROR,
    onMessage: WS_USER_FEED_MESSAGE,
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsFeedActions), socketMiddleware(wsUserFeedActions)));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, // return value type
    RootState, // app state type
    never, // extra argument type
    TApplicationActions // action type
    >;
