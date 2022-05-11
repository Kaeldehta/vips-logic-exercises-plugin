import { nanoid } from "nanoid";
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { FCSolution } from "../types/fc";
import { getSolution } from "../utils";
import { isAssumption } from "../utils/fc";

type InsertFunction = (index: number, indentation: number) => void

interface FCSolutionStore extends FCSolution {
    insertAssumption: InsertFunction
    insertRuleLine: InsertFunction
    insertPremise: (index: number) => void
    insertAbsurdity: InsertFunction
    removeLine: (id: string) => void
}

const defaultSolution: FCSolution = getSolution<FCSolution>() ?? {
    ids: [],
    lines: {},
}

const useFCSolution = create<FCSolutionStore>()(immer((set, get) => ({
    ...defaultSolution,
    insertAbsurdity: (index, indentation) => set(state => {
        const newId = nanoid();
        state.ids.splice(index, 0, newId);
        state.lines[newId] = {
            from: [null, null],
            indentation,
        }
    }),
    insertAssumption: (index, indentation) => set(state => {
        const newId = nanoid();
        state.ids.splice(index, 0, newId);
        state.lines[newId] = {
            formula: "",
            indentation,
            from: [],
        }
    }),
    insertPremise: (index) => set(state => {
        const newId = nanoid();
        state.ids.splice(index, 0, newId);
        state.lines[newId] = {
            formula: "",
            indentation: 0,
            from: [],
        }
    }),
    insertRuleLine: (index, indentation) => set(state => {
        const newId = nanoid();
        state.ids.splice(index, 0, newId);
        state.lines[newId] = {
            formula: "",
            rule: null,
            indentation,
            from: [],
        }
    }),
    removeLine: (id) => set(state => {

        const thisLine = state.lines[id];
        const index = state.ids.indexOf(id);

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

    })
})))

export default useFCSolution;