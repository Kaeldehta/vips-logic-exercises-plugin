import { ActionReducerMapBuilder, createAction, nanoid } from "@reduxjs/toolkit";
import { removeLine, setRule } from ".";
import type { LineId, Response } from "../../types";

export const start = createAction("semTree/start");
export const addFalsum = createAction<LineId>("semTree/addFalsum");
export const addAssumption = createAction<LineId>("semTree/addAssumption");
export const addRuleLine = createAction<LineId>("semTree/addRuleLine");
export const branch = createAction<LineId>("semTree/branch");

const builderCallback = (builder: ActionReducerMapBuilder<Response>) => 
    builder.addCase(start, (state) => {
        state.ids.push("root");
        state.lines["root"] = {
            formula: "",
            from: [],
            children: [],
        };
    }).addCase(addFalsum, (state, action) => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            from: [null, null],
            children: [],
        }
        state.lines[action.payload].children = [newId];
    }).addCase(addAssumption, (state, action) => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            formula: "",
            children: [],
            from: [],
        }
        state.lines[action.payload].children = [newId];
    }).addCase(addRuleLine, (state, action) => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            formula: "",
            from: [null],
            rule: null,
            children: []
        }
        state.lines[action.payload].children = [newId];
    }).addCase(branch, (state, action) => {
        const newId1 = nanoid();
        const newId2 = nanoid();
        state.ids.push(newId1, newId2);
        state.lines[newId1] = {
            formula: "",
            from: [null],
            rule: null,
            children: []
        }
        state.lines[newId2] = {
            formula: "",
            from: [null],
            rule: null,
            children: []
        }

        state.lines[action.payload].children = [newId1, newId2];
    }).addCase(removeLine, (state, action) => {
        const index = state.ids.indexOf(action.payload);
        state.ids.splice(index, 1);

        const parent = state.ids.findIndex((id) => state.lines[id].children[0] == action.payload || state.lines[id].children[1] == action.payload);

        state.lines[state.ids[parent]].children = [];

        delete state.lines[action.payload];
    })

export default builderCallback;
