import { nanoid } from "nanoid"
import create from "zustand"
import { immer } from "zustand/middleware/immer"
import { getTask } from "../utils"

interface Statements {
    ids: Array<string>
    entries: Record<string, string>
    set: (id: string, value: string) => void
    add: (index: number) => void,
    remove: (id: string) => void
}

const task = getTask<{
    statements: {
        ids: Array<string>
        entries: Record<string, string>
    }
}>()

const useStatements = create<Statements>()(immer((set, get) => ({
    ids: task?.statements.ids ?? [],
    entries: task?.statements.entries ?? {},
    set: (id, value) => set(state => {
        state.entries[id] = value
    }),
    add: (index) => set(state => {
        const id = nanoid()
        state.ids.splice(index, 0, id);
        state.entries[id] = ""
    }),
    remove: (id) => set(state => {
        const index = state.ids.indexOf(id);
        state.ids.splice(index, 1);
        delete state.entries[id];
    })
})))

export default useStatements;