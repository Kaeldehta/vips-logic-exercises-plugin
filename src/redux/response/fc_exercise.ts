import { ActionReducerMapBuilder, createAction, nanoid } from "@reduxjs/toolkit";
import type { LineId, Response } from "../../types";

export const insertAbsurdity = createAction<{index: number, indentation: number}>("fcProof/addFalsum");
export const insertAssumption = createAction<{index: number, indentation: number}>("fcProof/addAssumption");
export const insertRuleLine = createAction<{index: number, indentation: number}>("fcProof/addRuleLine");
export const insertPremise = createAction<{index: number}>("fcProof/addPremise");
export const removeLine = createAction<LineId>("fcProof/removeLine");

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
    }).addCase(removeLine, (state, action) => {
        const thisLine = state.lines[action.payload];
        const index = state.ids.indexOf(action.payload);

        const assumption = !thisLine.from.length && thisLine.rule === undefined;
        let removeCount = 1;

        if(assumption) {
            const indentation = thisLine.indentation
            for(let i = index + 1; i < state.ids.length; i++) {
                const line = state.lines[state.ids[i]];

                if(line.indentation !== indentation || (!line.from.length && line.rule === undefined)) {
                    break;
                }

                removeCount++;
            }
        }

        const deleted = state.ids.splice(index, removeCount);

        deleted.forEach((id) => delete state.lines[id]);
    })

export default builderCallback;
