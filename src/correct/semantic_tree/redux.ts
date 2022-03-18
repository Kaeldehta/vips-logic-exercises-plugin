import { configureStore, Reducer } from "@reduxjs/toolkit";
import { taskReducer, solutionReducer } from "../redux";
import { SemanticTree, SemanticTreeTask } from "../../types";

const store = configureStore({
    reducer: {
        task: taskReducer as Reducer<SemanticTreeTask>,
        solution: solutionReducer as Reducer<SemanticTree>,
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>