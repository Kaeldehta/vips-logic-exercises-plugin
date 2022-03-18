import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux";
import { getViewData } from "..";
import { CorrectView,  LineId, Solution } from "../types";
import { RootState as FitchCalculusRootState } from "./fitch_calculus/redux";
import { RootState as SemanticTreeRootState } from "./semantic_tree/redux";

const {solution, task} = getViewData() as CorrectView;

export const defaultSolution: Solution = {
    ids: [],
    lines: {},
    root: null
};

const initialState = solution?? defaultSolution;


if(Array.isArray(initialState.lines as unknown)) {
    initialState.lines = {};
}

export const solutionSlice = createSlice({
    name: "solution",
    initialState,
    reducers: {
        setFormula(state, action: PayloadAction<{id: LineId, formula: string}>) {
            state.lines[action.payload.id].formula = action.payload.formula;
        },
        setFrom(state, action: PayloadAction<{id: LineId, index: number, from: LineId}>) {
            state.lines[action.payload.id].from![action.payload.index] = action.payload.from;
        },
        setRule(state, action: PayloadAction<{id: LineId, rule: string, count: number}>) {
            const oldRule = state.lines[action.payload.id].rule;
            state.lines[action.payload.id].rule = action.payload.rule;
            if(oldRule !== action.payload.rule) {
                state.lines[action.payload.id].from = Array(action.payload.count).fill(null);
            }
        },
        removeLine(state, action: PayloadAction<LineId>) {

        }
    }
})

export const {reducer: taskReducer} = createSlice({
    name: "task",
    initialState: task,
    reducers: {}
})

export const useTypedSelector: TypedUseSelectorHook<SemanticTreeRootState | FitchCalculusRootState> = (selector) => useSelector(selector, shallowEqual);

export const {setFrom, setFormula, setRule, removeLine} = solutionSlice.actions;