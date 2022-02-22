import { ActionReducerMapBuilder, createAction, nanoid } from "@reduxjs/toolkit";
import type { Response } from "../../../types";

export const insertAbsurdity = createAction<{index: number, indentation: number}>("fcProof/addFalsum");
export const insertAssumption = createAction<{index: number, indentation: number}>("fcProof/addAssumption");
export const insertRuleLine = createAction<{index: number, indentation: number}>("fcProof/addRuleLine");
export const insertPremise = createAction<{index: number}>("fcProof/addPremise");

const builderCallback = (builder: ActionReducerMapBuilder<Response>) => 
    builder.addCase(insertAbsurdity, (state, action) => {
        const newId = nanoid();

        const lower = state.ids.slice(0, action.payload.index)

        const upper = state.ids.slice(action.payload.index)

        state.ids = [...lower, newId, ...upper];

        state.lines[newId] = {
            from: [null, null],
            indentation: action.payload.indentation,
            children: [],
        }
    }).addCase(insertAssumption, (state, action) => {
        const newId = nanoid();

        const lower = state.ids.slice(0, action.payload.index)

        const upper = state.ids.slice(action.payload.index)

        state.ids = [...lower, newId, ...upper];

        state.lines[newId] = {
            formula: "",
            indentation: action.payload.indentation,
            from: [],
            children: [],
        }
    }).addCase(insertRuleLine, (state, action) => {
        const newId = nanoid();

        const lower = state.ids.slice(0, action.payload.index)

        const upper = state.ids.slice(action.payload.index)

        state.ids = [...lower, newId, ...upper];

        state.lines[newId] = {
            formula: "",
            rule: null,
            children: [],
            indentation: action.payload.indentation,
            from: [],
        }
    }).addCase(insertPremise, (state, action) => {
        const newId = nanoid();

        const lower = state.ids.slice(0, action.payload.index)

        const upper = state.ids.slice(action.payload.index)

        state.ids = [...lower, newId, ...upper];

        state.lines[newId] = {
            formula: "",
            rule: null,
            children: [],
            indentation: 0,
            from: [],
        }
    })

export default builderCallback;
