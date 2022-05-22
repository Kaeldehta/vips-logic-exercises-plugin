import { atom } from "jotai";
import { atomFamily, selectAtom } from "jotai/utils";
import { focusAtom } from 'jotai/optics'
import { FCProof, FCProofLine } from "../../types/fc";
import { getTask } from "../../utils";
import { isAssumption, isPremise } from "../../utils/fc";
import { nanoid } from "nanoid";

interface Params {
    id: string,
    line?: FCProofLine
}

const defaultSolution: FCProof = getTask() ?? {
    ids: [],
    lines: {}
}

export const idsAtom = atom(defaultSolution.ids);

export const noLinesAtom = selectAtom(idsAtom, state => !state.length);

export const lineAtom = atomFamily(({id, line}: Params) => atom(line ?? defaultSolution.lines[id]), (a, b) => a.id == b.id)

export const formulaAtom = atomFamily((id: string) => focusAtom(lineAtom({id}), (optic) => optic.prop("formula")));

export const indexAtom = atomFamily((id: string) => selectAtom(idsAtom, (ids) => ids.indexOf(id)));

export const indentationAtom = atomFamily((id: string) => selectAtom(lineAtom({id}), state => state.indentation));

export const isAssumptionAtom = atomFamily((id: string) => selectAtom(lineAtom({id}), state => isAssumption(state)))

export const isPremiseAtom = atomFamily((id: string) => selectAtom(lineAtom({id}), state => isPremise(state)));

export const indentationDeltaAtom = atomFamily((id: string) => atom<number>((get) => {

    const nextId = get(idsAtom)[get(indexAtom(id)) + 1];

    const indentation = get(indentationAtom(id));

    if(nextId) {
        const nextIndentation = get(indentationAtom(nextId));
        if(get(isAssumptionAtom(nextId))) {
            if(nextIndentation > indentation) return 0;
            
            return -indentation;
        }

        return nextIndentation - indentation;

    }

    return -indentation;

}));

export const removeAtom = atom(null, (get, set, id: string) => {
    const index = get(idsAtom).indexOf(id);
    let removeCount = 1;

    if(get(isAssumptionAtom(id))) {
        const indentation = get(indentationAtom(id))
        for(let i = index + 1; i < get(idsAtom).length; i++) {
            const lineId = get(idsAtom)[i];

            if(get(indentationAtom(lineId)) !== indentation || get(isAssumptionAtom(lineId))) {
                break;
            }

            removeCount++;
        }
    }

    set(idsAtom, state => {
        const newIds = [...state];
        const deleted = newIds.splice(index, removeCount);
        deleted.forEach((id) => {
            lineAtom.remove({id});
        })
        return newIds;
    })
})

export const insertLineAtom = atom(null, (_get, set, {index, line}: {index: number, line: FCProofLine}) => {
    const newId = nanoid();

    set(idsAtom, state => {
        const newIds = [...state];
        newIds.splice(index, 0, newId);
        return newIds;
    })

    lineAtom({id: newId, line});

})

export const insertAssumptionAtom = atom(null, (_get, set, {index, indentation}: {index: number, indentation: number}) => {
    set(insertLineAtom, {
        index, 
        line: {
            formula: "",
            indentation,
            from: [],
        }
    })
})

export const insertPremiseAtom = atom(null, (_get, set, index: number) => {
    set(insertLineAtom, {
        index,
        line: {
            formula: "",
            indentation: 0,
            from: [],
        }
    })
})

export const insertAbsurdityAtom = atom(null, (_get, set, {index, indentation}: {index: number, indentation: number}) => {
    set(insertLineAtom, {
        index,
        line: {
            from: [null, null],
            indentation,
        }
    })
})

export const insertRuleLineAtom = atom(null, (_get, set, {index, indentation}: {index: number, indentation: number}) => {
    set(insertLineAtom, {
        index,
        line: {
            formula: "",
            rule: null,
            indentation,
            from: [],
        }
    })
})