import { Selector } from "@reduxjs/toolkit";
import { shallowEqual, TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState as CorrectFCRootState } from "./correct/fitch_calculus/redux";
import { RootState as SolveFCRootState } from "./solve/fitch_calculus/redux";
import { RootState as CorrectSTRootState } from "./correct/semantic_tree/redux";
import { RootState as SolveSTRootState } from "./solve/semantic_tree/redux";
import { FitchCalculusProof, LineId, SemanticTree } from "./types";
import { isAbsurdity, isAssumption, isPremise, isRuleLine, isSemanticTree } from "./utils";

export type SolutionSelector = 
    Selector<CorrectFCRootState, FitchCalculusProof> | 
    Selector<SolveFCRootState, FitchCalculusProof> |
    Selector<CorrectSTRootState, SemanticTree> |
    Selector<SolveSTRootState, SemanticTree>;


export const useAnySelector: TypedUseSelectorHook<any> = (selector) => useSelector(selector, shallowEqual);

export const useAssumptionState = (selector: SolutionSelector, id: LineId) => useAnySelector(state => isAssumption(selector(state).lines[id]));

export const usePremiseState = (selector: SolutionSelector, id: LineId) => useAnySelector(state => isPremise(selector(state).lines[id]));

export const useAbsurdityState = (selector: SolutionSelector, id: LineId) => useAnySelector(state => isAbsurdity(selector(state).lines[id]));

export const useRuleLineState = (selector: SolutionSelector, id: LineId) => useAnySelector(state => isRuleLine(selector(state).lines[id]));

export const useFromSuffix = (selector: SolutionSelector, id: LineId, index: number) => useAnySelector(state => {

    if(isSemanticTree(selector(state))) return null

    const line = selector(state).lines[id];

    if(index === line.from.length - 1) return null

    if(index === 1 || index === 3 || line.rule === "raa" || line.rule === "i-intro") return "-"
    
    return <div className="mr-2">,</div>
})

export const useLastPremiseState = (selector: SolutionSelector, id: string) => 
    useAnySelector(state => {

        const lines = selector(state).lines;
        const ids = selector(state).ids;

        const line = lines[id];

        if (isPremise(line)) {
            const index = ids.indexOf(id);

            if (index == ids.length - 1)
                return true;

            if (!isPremise(lines[ids[index + 1]]))
                return true;
        }

        return false;
    });
