import { ActionReducerMapBuilder, createAction, createReducer } from "@reduxjs/toolkit";
import type { LineId, Response } from "../../types";

export const setFormula = createAction<{id: LineId, formula: string}>("line/setFormula");
export const setFrom = createAction<{id: LineId, index: number, from: LineId}>("line/setFrom");
export const setRule = createAction<{id: LineId, rule: string}>("line/setRule");
export const removeLine = createAction<LineId>("line/removeLine");

const createResponseReducer = async () => {
    const element = document.getElementById("exercise-container");

    if(!element) throw new Error("Could not find data element");

    const initialState: Response = element.dataset.response? JSON.parse(element.dataset.response) : {
        ids: [],
        lines: {}
    };

    const {type} = element.dataset;

    const {default: builderCallback}: {default: (builder: ActionReducerMapBuilder<Response>) => ActionReducerMapBuilder<Response>} = await import(`./${type}`);

    return createReducer(initialState, (builder) => {
        builderCallback(builder).addCase(setFormula, (state, action) => {
            state.lines[action.payload.id].formula = action.payload.formula;
        }).addCase(setFrom, (state, action) => {
            state.lines[action.payload.id].from![action.payload.index] = action.payload.from;
        });
    });
}

export default createResponseReducer;