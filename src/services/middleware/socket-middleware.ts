import {Middleware, MiddlewareAPI} from "redux";
import {AppDispatch, RootState} from "../reducers/store";
import {WS_FEED_CLOSE, WS_FEED_CONNECT, WS_FEED_ERROR, WS_FEED_MESSAGE, WS_FEED_OPEN} from "../actions/ws-feed";
import {WS_USER_FEED_CLOSE, WS_USER_FEED_CONNECT, WS_USER_FEED_ERROR, WS_USER_FEED_MESSAGE, WS_USER_FEED_OPEN} from "../actions/ws-user-feed";

type TWsActions = {
  wsConnect: typeof WS_FEED_CONNECT | typeof WS_USER_FEED_CONNECT;
  onOpen: typeof WS_FEED_OPEN | typeof WS_USER_FEED_OPEN;
  onClose: typeof WS_FEED_CLOSE | typeof WS_USER_FEED_CLOSE;
  onError: typeof WS_FEED_ERROR | typeof WS_USER_FEED_ERROR;
  onMessage: typeof WS_FEED_MESSAGE | typeof WS_USER_FEED_MESSAGE;
};

export const socketMiddleware =
  (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
      let socket: WebSocket | null = null;

      return (next) => (action) => {
        const {dispatch} = store;
        const {type, payload} = action;
        const {wsConnect, onOpen, onClose, onError, onMessage} = wsActions;

        if (type === wsConnect) {
          socket = new WebSocket(payload);
        }

        if (socket) {
          socket.onopen = () => {
            dispatch({
              type: onOpen,
            })
          };

          socket.onerror = error => {
            dispatch({
              type: onError,
              payload: JSON.stringify(error)
            })
          }

          socket.onclose = event => {
            event.code !== 1000 ?
                dispatch({type: onError, payload: event.code.toString()}) :
                dispatch({type: onClose});
          };

          socket.onmessage = event => {
            const {data} = event;
            const parsedData = JSON.parse(data);
            dispatch({type: onMessage, payload: parsedData});
          }
        }

        next(action);
      };
    }) as Middleware
  }
