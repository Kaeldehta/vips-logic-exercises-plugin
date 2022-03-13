import { ActionReducerMapBuilder, createAction, createReducer } from "@reduxjs/toolkit";
import type { LineId, Response } from "../../types";

export const setFormula = createAction<{id: LineId, formula: string}>("line/setFormula");
export const setFrom = createAction<{id: LineId, index: number, from: LineId}>("line/setFrom");
export const setRule = createAction<{id: LineId, rule: string, count: number}>("line/setRule");
export const removeLine = createAction<LineId>("line/removeLine");

const createResponseReducer = async () => {
    const element = document.getElementById("exercise-container");

    if(!element) throw new Error("Could not find data element");

    const initialState: Response = element.dataset.response? JSON.parse(element.dataset.response) : {
        ids: [],
        lines: {}
    };

    if(Array.isArray(initialState.lines as unknown)) {
        initialState.lines = {};
    }

    const {type} = element.dataset;

    const {default: builderCallback}: {default: (builder: ActionReducerMapBuilder<Response>) => ActionReducerMapBuilder<Response>} = await import(`./${type}`);

    return createReducer(initialState, (builder) => {
        builderCallback(builder).addCase(setFormula, (state, action) => {
            state.lines[action.payload.id].formula = action.payload.formula;
        }).addCase(setFrom, (state, action) => {
            state.lines[action.payload.id].from![action.payload.index] = action.payload.from;
        }).addCase(setRule, (state, action) => {
            const oldRule = state.lines[action.payload.id].rule;
            state.lines[action.payload.id].rule = action.payload.rule;
            if(oldRule !== action.payload.rule) {
                state.lines[action.payload.id].from = Array(action.payload.count).fill(null);
            }
        })
    });
}

export default createResponseReducer;