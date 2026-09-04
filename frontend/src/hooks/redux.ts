import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, RootState } from "../services/reducers/store";

export const useDispatchHook = () => dispatchHook<AppDispatch>()
export const useSelectorHook: TypedUseSelectorHook<RootState> = selectorHook