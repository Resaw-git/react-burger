import {
    WS_USER_FEED_CLOSE,
    WS_USER_FEED_CONNECT,
    WS_USER_FEED_ERROR,
    WS_USER_FEED_MESSAGE,
    WS_USER_FEED_OPEN
} from "../../actions/ws-user-feed";
import {initialState, wsUserFeedReducer} from "./ws-user-feed";
import {testFeed} from "../../../utils/test-data";

describe("Check user feed reducer", () => {
    test("Should return initial state", () => {
        expect(wsUserFeedReducer(undefined, {} as any)).toEqual(initialState)
    })

    test("Should return state of connect", () => {
        expect(
            wsUserFeedReducer(initialState, {
                type: WS_USER_FEED_CONNECT,
                payload: "wss://test.api/feed/user",
            })
        ).toEqual({
            ...initialState,
            data: initialState.data,
            wsConnecting: true,
            wsConnect: false,
        });
    });

    test("Should return state of opened connection", () => {
        expect(
            wsUserFeedReducer(initialState, {
                type: WS_USER_FEED_OPEN,
            })
        ).toEqual({
            ...initialState,
            data: initialState.data,
            wsConnecting: false,
            wsConnect: true,
        });
    });

    test("Should return state of closed connection", () => {
        expect(
            wsUserFeedReducer(initialState, {
                type: WS_USER_FEED_CLOSE,
            })
        ).toEqual({
            ...initialState,
            data: initialState.data,
            wsConnecting: false,
            wsConnect: false,
            error: "",
        });
    });

    test("Should return state of ws error", () => {
        expect(
            wsUserFeedReducer(initialState, {
                type: WS_USER_FEED_ERROR,
                payload: "some error"
            })
        ).toEqual({
            ...initialState,
            data: initialState.data,
            wsConnecting: false,
            wsConnect: false,
            error: "some error",
        });
    });

    test("Should return state of ws message", () => {
        expect(
            wsUserFeedReducer(initialState, {
                type: WS_USER_FEED_MESSAGE,
                payload: testFeed,

            })
        ).toEqual({
            ...initialState,
            data: testFeed,
        });
    });
});
