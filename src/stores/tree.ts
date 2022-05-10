import { immer } from "zustand/middleware/immer";
import create from "zustand";
import { getTask } from "../utils";
import { nanoid } from "nanoid";

interface TreeTaskStore {
    task: {
        type: "tree"
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

const defaultTask: TreeTaskStore["task"] = getTask() as TreeTaskStore["task"] | null ?? {
    type: "tree", 
    predicate: false, 
    consequence: "", 
    statements: {
        ids: [], 
        entries: {}
    }
};

export const useFCTask = create<TreeTaskStore>()(immer((set, get) => ({
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