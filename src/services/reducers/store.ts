import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./index";
import { TApplicationActions } from "../actions"

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType, // return value type
    RootState, // app state type
    never, // extra argument type
    TApplicationActions // action type
    >;
