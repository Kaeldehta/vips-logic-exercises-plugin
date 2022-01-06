import { none, State, useState } from "@hookstate/core";
import { isAssumptionState, isRuleApplicationState, ProofLine, Absurdity as AbsurdityType, isPremiseState, isAssumption } from "./domain";
import LineWrapper from "./LineWrapper";
import RuleApplication from "./RuleApplication";

import Assumption from "./Assumption";
import Absurdity from "./Absurdity";
import Premise from "./Premise";
import { stat } from "fs";
import internal from "stream";
import { pathToPHPFormName } from "../utils";

interface Props {
    state: State<ProofLine>
    linesState: State<ProofLine[]>
    index: number
}

export default ({state: propState, linesState}: Props) => {

    const state = useState(propState);

    const index = state.path[0] as number;

    const generateLine = () => {
        if(isAssumptionState(state.line)) {
            return <Assumption state={state.line}/>
        }
        else if(isRuleApplicationState(state.line)) {
            return <RuleApplication state={state.line} linesState={linesState}/>
        }
        else if(isPremiseState(state.line)) {
            return <Premise state={state.line} />
        }
        
        return <Absurdity state={state.line as State<AbsurdityType>} linesState={linesState}/>
    }

    return <LineWrapper height="h-12" head={index + 1} indentationLevel={state.indentationLevel.value} remove={isAssumptionState(state.line)? () => linesState.merge(lines => {
        var merge: Record<number, ProofLine> = {};
        merge[index] = none;
        let i = index;
        for(let i = index + 1; i < lines.length; i++) {
            const cur = lines[i];
            if(cur.indentationLevel < lines[index].indentationLevel || (isAssumption(cur.line) && cur.indentationLevel == lines[index].indentationLevel)) break;
            merge[i] = none;
        }
        return merge;
    }): () => state.set(none)}>
        <input type="hidden" name={pathToPHPFormName(state.id.path)} value={state.id.value}/>
        <input type="hidden" name={pathToPHPFormName(state.indentationLevel.path)} value={state.indentationLevel.value}/>
        {generateLine()}
    </LineWrapper>
}