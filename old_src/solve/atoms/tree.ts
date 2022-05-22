import { atom } from "jotai";
import { focusAtom } from "jotai/optics";
import { atomFamily, selectAtom } from "jotai/utils";
import { nanoid } from "nanoid";
import { TreeSolution, TreeSolutionLine } from "../../types/tree";
import { getTask } from "../../utils";

interface Params {
    id: string,
    line?: TreeSolutionLine
}

const defaultSolution: TreeSolution = getTask() ?? {
    ids: [],
    lines: {},
    root: null,
}

export const rootAtom = atom(defaultSolution.root);

export const idsAtom = atom(defaultSolution.ids);

export const indexAtom = atomFamily((id: string) => selectAtom(idsAtom, (ids) => ids.indexOf(id)));

export const lineAtom = atomFamily(({id, line}: Params) => atom(line ?? defaultSolution.lines[id]), (a, b) => a.id == b.id);

export const isEmptyAtom = selectAtom(rootAtom, root => root === null);

export const childrenAtom = atomFamily((id: string) => focusAtom(lineAtom({id}), optics => optics.prop("children")));

export const hasChildrenAtom = atomFamily((id: string) => selectAtom(childrenAtom(id), state => !!state));

export const insertNodeAtom = atom(null, (get, set, {parent, node}: {parent?: string, node: TreeSolutionLine}) => {
    const newId = nanoid();
    set(idsAtom, ids => {
        return [...ids, newId]
    })

    lineAtom({id: newId, line: node});

    if(parent) {

        const children = get(childrenAtom(newId));

        if(children.length) {
            set(childrenAtom(parent), []);
        }

        set(childrenAtom(parent), ids => {
            return [...ids, newId];
        });

    } else {
        set(rootAtom, newId);
    }
})

export const startAtom = atom(null, (_get, set) => {
    set(insertNodeAtom, {
        node: {
            formula: "",
            from: [],
            children: [],
        }
    })
})

export const addFalsumAtom = atom(null, (_get, set, parent: string) => {
    set(insertNodeAtom, {
        parent,
        node: {
            from: [null, null],
            children: [],
        }
    })
})

export const addAssumptionAtom = atom(null, (get, set, parent: string) => {
    set(insertNodeAtom, {
        parent,
        node: {
            formula: "",
            children: get(childrenAtom(parent)),
            from: [],
        }
    })
})

export const addRuleLineAtom = atom(null, (get, set, parent: string) => {
    set(insertNodeAtom, {
        parent,
        node: {
            formula: "",
            from: [null],
            rule: null,
            children: get(childrenAtom(parent)),
        }
    })
})

export const branchAtom = atom(null, (_get, set, parent: string) => {
    set(insertNodeAtom, {
        parent,
        node: {
            formula: "",
            from: [null],
            rule: null,
            children: []
        }
    })
    set(insertNodeAtom, {
        parent,
        node: {
            formula: "",
            from: [null],
            rule: null,
            children: []
        }
    })
})

export const parentAtom = atomFamily((id: string) => atom<string>((get) => {
    return get(idsAtom).find((parent) => {
        const parentChildren = get(childrenAtom(parent));
        return parentChildren[0] === id || parentChildren[1] === id
    })!
}))

export const recursiveRemoveAtom = atom(null, (get, set, id: string) => {

    const children = get(childrenAtom(id));

    children.forEach((id) => set(recursiveRemoveAtom, id));

    set(removeAtom, id);
})

export const removeAtom = atom(null, (get, set, id: string) => {
    const index = get(indexAtom(id));

    set(idsAtom, ids => {
        const newIds = [...ids];
        newIds.splice(index, 1);
        return newIds;
    })

    lineAtom.remove({id});
})

export const removeNodeAtom = atom(null, (get, set, id: string) => {

    const children = get(childrenAtom(id));

    const root = get(rootAtom);

    if(root === id) {

        if(children.length === 1) {
            set(rootAtom, children[0])
        }
        else {
            if(children.length === 2) {
                set(recursiveRemoveAtom, children[0]);
                set(recursiveRemoveAtom, children[1]);
            }
            set(rootAtom, null);
        }
    }
    else {
        const parentId = get(parentAtom(id));

        const parentChildren = get(childrenAtom(parentId));

        const childIndex = parentChildren.findIndex(child => child === id);
        
        if(children.length == 1) {
            set(childrenAtom(parentId), children => {
                const newChildren = [...children];
                newChildren[childIndex] = children[0];
                return newChildren;
            })
        }
        else if(children.length === 2) {

            if(parentChildren.length === 2) {
                set(recursiveRemoveAtom, children[0]);
                set(recursiveRemoveAtom, children[1]);
                set(childrenAtom(parentId), children => {
                    const newChildren = [...children];
                    newChildren.splice(childIndex, 1);
                    return newChildren;
                })
            }
            else {
                set(childrenAtom(parentId), children);
            }
            
        }
        else {
            set(childrenAtom(parentId), children => {
                const newChildren = [...children];
                newChildren.splice(childIndex, 1);
                return newChildren;
            })
        }
    }

    set(removeAtom, id);
})