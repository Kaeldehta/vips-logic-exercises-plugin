import { nanoid } from "nanoid";
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { getSolution, getTask } from "../utils";

interface FCTaskStore {
    task: {
        type: "fc"
        consequence: string
        statements: {
            ids: Array<string>
            entries: Record<string, string>
        }
        predicate: boolean
    },
    setConsequence: (value: string) => void
    setStatement: (id: string, value: string) => void
    addStatement: (index: number) => void
}

const defaultTask: FCTaskStore["task"] = getTask() as FCTaskStore["task"] | null ?? {
    type: "fc", 
    predicate: false, 
    consequence: "", 
    statements: {
        ids: [], 
        entries: {}
    }
};

export const useFCTask = create<FCTaskStore>()(immer((set, get) => ({
    task: defaultTask,
    setConsequence: (value) => set(state => {
        state.task.consequence = value
    }),
    setStatement: (id, value) => set(state => {
        state.task.statements.entries[id] = value
    }),
    addStatement: (index) => set(state => {
        const id = nanoid()
        state.task.statements.ids.splice(index, 0, id);
        state.task.statements.entries[id] = ""
    })
})))

interface FCSolutionStore {
    solution: {
        ids: Array<string>
        entries: Record<string, {
            formula?: string
            indentation: number
            rule?: string | null
            children: []
            from: Array<string | null>
        }>
    }

}

const defaultSolution: FCSolutionStore["solution"] = getSolution() ?? {
    ids: [],
    entries: {},
}

export const useFCSolution = create<FCSolutionStore>()(immer((set, get) => ({
    solution: defaultSolution,
})))