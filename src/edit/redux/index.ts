import { configureStore } from "@reduxjs/toolkit";
import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux";
import reducer, {actions} from "./task";

const store = configureStore({
    reducer
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector(selector, shallowEqual);

export const {setConsequence, setStatement, addStatement, removeStatement} = actions;