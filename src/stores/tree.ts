import { TreeSolution, TreeSolutionLine } from "../types/tree"
import { getSolution } from "../utils"
import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";

type LineFunction = (id: string) => void

interface TreeSolutionStore extends TreeSolution {
    start: () => void
    addAssumption: LineFunction
    addRuleLine: LineFunction
    branch: LineFunction
    addFalsum: LineFunction
    removeLine: LineFunction,
    insertLine: (line: TreeSolutionLine, parent?: string) => void,
    findParent: (id: string) => string | undefined
}

const defaultSolution: TreeSolution = getSolution<TreeSolution>() ?? {
    ids: [],
    lines: {},
    root: null
}

const useTreeSolution = create<TreeSolutionStore>()(immer((set, get) => ({
    ...defaultSolution,
    findParent: (id) => get().ids.find(
        (parentId) => get().lines[parentId].children[0] === id || get().lines[parentId].children[1] === id
    ),
    insertLine: (line, parent) => set(state => {
        const newId = nanoid();
        state.ids.push(newId);
        state.lines[newId] = line;
        if(parent) {
            if(line.children.length) {
                state.lines[parent].children = []
            }
            state.lines[parent].children.push(newId);
        } else {
            state.root = newId;
        }
    }),
    start: () => get().insertLine({
        formula: "",
        from: [],
        children: [],
    }),
    addFalsum: (id) => get().insertLine({
        from: [null, null],
        children: [],
    }, id),
    addAssumption: (id) => get().insertLine({
        formula: "",
        children: get().lines[id].children,
        from: [],
    }),
    addRuleLine: (id) => get().insertLine({
        formula: "",
        from: [null],
        rule: null,
        children: get().lines[id].children
    }, id),
    branch: (id) => {
        get().insertLine({
            formula: "",
            from: [null],
            rule: null,
            children: []
        }, id)
        get().insertLine({
            formula: "",
            from: [null],
            rule: null,
            children: []
        }, id)
    },
    removeLine: (id) => set(state => {
        const recursiveRemove = (id: string) => {

            const children = state.lines[id].children;

            children.forEach((id) => recursiveRemove(id));

            const index = state.ids.indexOf(id);

            state.ids.splice(index, 1);

            delete state.lines[id];
        }

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
                state.root = null;
            }
        }
        else {
            const parentId = state.findParent(id)!;

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
    })

})))

export default useTreeSolution;