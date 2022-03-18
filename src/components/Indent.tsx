import { Selector } from "@reduxjs/toolkit";
import { useAnySelector, useAssumptionState, useLastPremiseState } from "../hooks"
import { FitchCalculusProof, LineId } from "../types"
import Border, { AssumptionBorder, LastPremiseBorder } from "./Border";

import { RootState as CorrectRootState } from "../correct/fitch_calculus/redux";
import { RootState as SolveRootState } from "../solve/fitch_calculus/redux";

interface IndentProps {
    id: LineId;
    solutionSelector: Selector<CorrectRootState, FitchCalculusProof> | Selector<SolveRootState, FitchCalculusProof>;
}

const Indent = ({id, solutionSelector}: IndentProps) => {
    const indentation = useAnySelector(state => solutionSelector(state).lines[id].indentation);

    const assumption = useAssumptionState(solutionSelector, id);
    const lastPremise = useLastPremiseState(solutionSelector, id);

    return <>{Array(indentation + 1).fill(0).map((_, index) => {
        if (assumption && index === indentation) return <AssumptionBorder key={index}/>
        if(lastPremise) return <LastPremiseBorder key={index}/>
        return <Border key={index}/>
    })}</>
}

export default Indent;
