import { configureStore, createSlice, Reducer, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { taskReducer, solutionSlice } from "../redux";
import { FitchCalculusProof, FitchCalculusTask, LineId } from "../../types";
import { isAssumption } from "../../utils";
import undoable from "redux-undo";
import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux";

type ProofPayload = PayloadAction<{
    indentation: number,
    index: number
}>

const slice = createSlice({
    initialState: solutionSlice.getInitialState() as FitchCalculusProof,
    name: solutionSlice.name,
    reducers: {
        ...solutionSlice.caseReducers,
        insertAbsurdity(state, action: ProofPayload) {
            const newId = nanoid();
    
            state.ids.splice(action.payload.index, 0, newId);
    
            state.lines[newId] = {
                from: [null, null],
                indentation: action.payload.indentation,
                children: [],
            }
        },
        insertAssumption(state, action: ProofPayload) {
            const newId = nanoid();
    
            state.ids.splice(action.payload.index, 0, newId);
    
            state.lines[newId] = {
                formula: "",
                indentation: action.payload.indentation,
                from: [],
                children: [],
            }
        },
        insertRuleLine(state, action: ProofPayload) {
            const newId = nanoid();
    
            state.ids.splice(action.payload.index, 0, newId);
    
            state.lines[newId] = {
                formula: "",
                rule: null,
                children: [],
                indentation: action.payload.indentation,
                from: [],
            }
        },
        insertPremise(state, action: PayloadAction<{index: number}>) {
            const newId = nanoid();
    
            state.ids.splice(action.payload.index, 0, newId);
    
            state.lines[newId] = {
                formula: "",
                children: [],
                indentation: 0,
                from: [],
            }
        },
        removeLine(state, action: PayloadAction<LineId>) {
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
        }

    }
})


const store = configureStore({
    reducer: {
        task: taskReducer as Reducer<FitchCalculusTask>,
        solution: undoable(slice.reducer),
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>

export const useTypedSelector: TypedUseSelectorHook<RootState> = (selector) => useSelector(selector, shallowEqual);

export const {insertAbsurdity, insertAssumption, insertPremise, insertRuleLine} = slice.actions;