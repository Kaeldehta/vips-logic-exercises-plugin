import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { getViewData } from "../../";
import type { Task} from "../../types";

const {task} = getViewData();

export const defaultTask: Task = {
    type: "semantic_tree",
    consequence: "",
    statements: {
        ids: [],
        entries: {}
    },
    predicateLogic: false
};

const initialState = task?? defaultTask;


if(Array.isArray(initialState.statements.entries as unknown)) {
    initialState.statements.entries = {};
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        setConsequence(state, action: PayloadAction<string>) {
            state.consequence = action.payload
        },
        setStatement(state, action: PayloadAction<{id: string, statement: string}>) {
            state.statements.entries[action.payload.id] = action.payload.statement
        },
        addStatement(state) {
            const newId = nanoid()
            state.statements.ids.push(newId);
            state.statements.entries[newId] = ""
        },
        removeStatement(state, action: PayloadAction<string>) {
            const index = state.statements.ids.indexOf(action.payload);
            state.statements.ids.splice(index, 1);
            delete state.statements.entries[action.payload];
        }
    }
})

export const actions = taskSlice.actions;

export default taskSlice.reducer;