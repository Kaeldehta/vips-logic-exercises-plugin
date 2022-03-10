import { ActionReducerMapBuilder, createAction, nanoid } from "@reduxjs/toolkit";
import { removeLine } from ".";
import type { Response } from "../../types";
import { isAssumption } from "../../utils";

export const insertAbsurdity = createAction<{index: number, indentation: number}>("fcProof/addFalsum");
export const insertAssumption = createAction<{index: number, indentation: number}>("fcProof/addAssumption");
export const insertRuleLine = createAction<{index: number, indentation: number}>("fcProof/addRuleLine");
export const insertPremise = createAction<{index: number}>("fcProof/addPremise");

const builderCallback = (builder: ActionReducerMapBuilder<Response>) => 
    builder.addCase(insertAbsurdity, (state, action) => {
        const newId = nanoid();

        state.ids.splice(action.payload.index, 0, newId);

        state.lines[newId] = {
            from: [null, null],
            indentation: action.payload.indentation,
            children: [],
        }
    }).addCase(insertAssumption, (state, action) => {
        const newId = nanoid();

        state.ids.splice(action.payload.index, 0, newId);

        state.lines[newId] = {
            formula: "",
            indentation: action.payload.indentation,
            from: [],
            children: [],
        }
    }).addCase(insertRuleLine, (state, action) => {
        const newId = nanoid();

        state.ids.splice(action.payload.index, 0, newId);

        state.lines[newId] = {
            formula: "",
            rule: null,
            children: [],
            indentation: action.payload.indentation,
            from: [],
        }
    }).addCase(insertPremise, (state, action) => {
        const newId = nanoid();

        state.ids.splice(action.payload.index, 0, newId);

        state.lines[newId] = {
            formula: "",
            children: [],
            indentation: 0,
            from: [],
        }
    }).addCase(removeLine, (state, action) => {
        const thisLine = state.lines[action.payload];
        const index = state.ids.indexOf(action.payload);

        const assumption = isAssumption(thisLine);
        let removeCount = 1;

        if(assumption) {
            const indentation = thisLine.indentation
            for(let i = index + 1; i < state.ids.length; i++) {
                const line = state.lines[state.ids[i]];

                if(line.indentation !== indentation || isAssumption(line)) {
                    break;
                }

                removeCount++;
            }
        }

        const deleted = state.ids.splice(index, removeCount);

        deleted.forEach((id) => delete state.lines[id]);
    })

export default builderCallback;
