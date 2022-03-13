import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { Answer} from "../types";

const element = document.getElementById("exercise-container");


const initialAnswerState: Answer = element?.dataset.answer? JSON.parse(element.dataset.answer) : {
    consequence: "",
    statements: {
        ids: [],
        entries: {}
    },
    predicateLogic: false
};

if(Array.isArray(initialAnswerState.statements.entries as unknown)) {
    initialAnswerState.statements.entries = {};
}

const answerSlice = createSlice({
    name: "answer",
    initialState: initialAnswerState,
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

export const {setConsequence, setStatement, addStatement, removeStatement} = answerSlice.actions;

export default answerSlice.reducer;