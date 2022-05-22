import { configureStore, Reducer } from "@reduxjs/toolkit";
import { taskReducer, solutionReducer } from "../redux";
import { FitchCalculusProof, FitchCalculusTask } from "../../types";
import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        task: taskReducer as Reducer<FitchCalculusTask>,
        solution: solutionReducer as Reducer<FitchCalculusProof>,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector(selector, shallowEqual);