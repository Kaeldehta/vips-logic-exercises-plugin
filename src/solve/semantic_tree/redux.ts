import { configureStore, createSlice, nanoid, PayloadAction, Reducer } from "@reduxjs/toolkit";
import undoable from "redux-undo";
import { taskReducer, solutionSlice } from "../redux";
import { LineId, SemanticTree, SemanticTreeTask } from "../../types";
import { findParent } from "../../utils";
import { TypedUseSelectorHook, useSelector, shallowEqual } from "react-redux";

const slice = createSlice({
    initialState: solutionSlice.getInitialState() as SemanticTree,
    name: solutionSlice.name,
    reducers: {
        ...solutionSlice.caseReducers,
        start(state) {
            const newId = nanoid();
            state.ids.push(newId);
            state.lines[newId] = {
                formula: "",
                from: [],
                children: [],
            };
            state.root = newId;
        },
        addFalsum(state, action: PayloadAction<LineId>) {
            const newId = nanoid();
            state.ids.push(newId);
            state.lines[newId] = {
                from: [null, null],
                children: [],
            }
            state.lines[action.payload].children = [newId];
        },
        addAssumption(state, action: PayloadAction<LineId>) {
            const newId = nanoid();
            state.ids.push(newId);
            state.lines[newId] = {
                formula: "",
                children: state.lines[action.payload].children,
                from: [],
            }
            state.lines[action.payload].children = [newId];
        },
        addRuleLine(state, action: PayloadAction<LineId>) {
            const newId = nanoid();
            state.ids.push(newId);
            state.lines[newId] = {
                formula: "",
                from: [null],
                rule: null,
                children: state.lines[action.payload].children
            }
            state.lines[action.payload].children = [newId];
        },
        branch(state, action: PayloadAction<LineId>) {
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
        },
        removeLine(state, action: PayloadAction<LineId>) {

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
                const parentId = findParent(id, state);
    
                const parentChildren = state.lines[parentId].children;
    
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
        }

    }
})

const store = configureStore({
    reducer: {
        task: taskReducer as Reducer<SemanticTreeTask>,
        solution: undoable(slice.reducer),
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector(selector, shallowEqual);

export const {start, branch, addAssumption, addFalsum, addRuleLine} = slice.actions;