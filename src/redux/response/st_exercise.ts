import { ActionReducerMapBuilder, createAction, nanoid } from "@reduxjs/toolkit";
import { LineId, Response } from "../../types";

export const start = createAction("semTree/start");
export const addFalsum = createAction<LineId>("semTree/addFalsum");
export const addAssumption = createAction<LineId>("semTree/addAssumption");
export const addRuleLine = createAction<LineId>("semTree/addRuleLine");
export const branch = createAction<LineId>("semTree/branch");

const builderCallback = (builder: ActionReducerMapBuilder<Response>) => 
    builder.addCase(start, (state) => {
        state.ids.push("root");
        state.lines["root"] = {
            formula: ""
        };
    }).addCase(addFalsum, (state, action) => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            from: [null, null]
        }
        state.lines[action.payload].children = [newId];
    }).addCase(addAssumption, (state, action) => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            formula: ""
        }
        state.lines[action.payload].children = [newId];
    }).addCase(addRuleLine, (state, action) => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            formula: "",
            from: [null],
            rule: null
        }
        state.lines[action.payload].children = [newId];
    }).addCase(branch, (state, action) => {
        const newId1 = nanoid();
        const newId2 = nanoid();
        state.ids.push(newId1, newId2);
        state.lines[newId1] = {
            formula: "",
            from: [null],
            rule: null
        }
        state.lines[newId2] = {
            formula: "",
            from: [null],
            rule: null
        }

        state.lines[action.payload].children = [newId1, newId2];
    })

export default builderCallback;
