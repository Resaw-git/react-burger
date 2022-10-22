import {WS_FEED_CLOSE, WS_FEED_CONNECT, WS_FEED_ERROR, WS_FEED_MESSAGE, WS_FEED_OPEN,} from "../../actions/ws-feed";
import {initialState, wsFeedReducer} from "./ws-feed";
import {testFeed} from "../../../utils/test-data";

describe("Check feed reducer", () => {
  // test("Should return initial state", () => {
  //     expect(wsFeedReducer(undefined, {})).toEqual(initialState)
  // })

  test("Should return state of connect", () => {
    expect(
      wsFeedReducer(initialState, {
        type: WS_FEED_CONNECT,
        payload: "wss://test.api/feed",
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
      wsFeedReducer(initialState, {
        type: WS_FEED_OPEN,
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
      wsFeedReducer(initialState, {
        type: WS_FEED_CLOSE,
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
      wsFeedReducer(initialState, {
        type: WS_FEED_ERROR,
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
      wsFeedReducer(initialState, {
        type: WS_FEED_MESSAGE,
        payload: testFeed,

      })
    ).toEqual({
      ...initialState,
      data: testFeed,
    });
  });
});
