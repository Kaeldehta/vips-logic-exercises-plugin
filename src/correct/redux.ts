import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux";
import { getViewData } from "..";
import { CorrectView } from "../types";
import { RootState as FitchCalculusRootState } from "./fitch_calculus/redux";
import { RootState as SemanticTreeRootState} from "./semantic_tree/redux";

const {solution, task} = getViewData() as CorrectView;

export const {reducer: solutionReducer} = createSlice({
    name: "solution",
    initialState: solution,
    reducers: {}
})

export const {reducer: taskReducer} = createSlice({
    name: "task",
    initialState: task,
    reducers: {}
})

export const useTypedSelector: TypedUseSelectorHook<FitchCalculusRootState| SemanticTreeRootState> = (selector) => useSelector(selector, shallowEqual);