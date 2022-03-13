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
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = {
            formula: "",
            from: [],
            children: [],
        };
        state.root = newId;
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
            children: state.lines[action.payload].children,
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
            children: state.lines[action.payload].children
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

        const recursiveRemove = (id: LineId) => {

            const children = state.lines[id].children;

            children.forEach((id) => recursiveRemove(id));

            const index = state.ids.indexOf(id);

            state.ids.splice(index, 1);

            delete state.lines[id];
        }

        const id = action.payload;

        const children = state.lines[id].children;

        if(state.root === id) {

            if(children.length === 1) {
                state.root = children[0]
            }
            else {
                if(children.length === 2) {
                    recursiveRemove(children[0]);
                    recursiveRemove(children[1]);
                }
                state.root = undefined;
            }
        }
        else {
            const [parentId, {children: parentChildren}] = Object.entries(state.lines).find(([, {children: [child1, child2]}]) => child1 === id || child2 == id)

            const childIndex = parentChildren.findIndex(child => child === id);
            
            if(children.length == 1) {
                parentChildren[childIndex] = children[0];
            }
            else if(children.length === 2) {

                if(parentChildren.length === 2) {
                    recursiveRemove(children[0]);
                    recursiveRemove(children[1]);
                    parentChildren.splice(childIndex, 1);
                }
                else {
                    state.lines[parentId].children = children
                }
                
            }
            else {
                parentChildren.splice(childIndex, 1);
            }
        }

        const index = state.ids.indexOf(id);
        state.ids.splice(index, 1);
        delete state.lines[id];
    })

export default builderCallback;
