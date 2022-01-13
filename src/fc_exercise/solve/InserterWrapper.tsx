import { State, useState } from "@hookstate/core";
import { isAssumptionState, isPremiseState, Response } from "../domain";
import Inserter from "./Inserter";
import { wrapState } from ".";

interface Props {
    proofState: State<Response>
    index: number
}

export default ({proofState, index}: Props) => {

    const {state, addLine} = wrapState(useState(proofState));

    const next = index + 1;

    const nextState = state.lines[next];

    const currentState = state.lines[index];

    const currentIndentation = currentState.indentationLevel.value;

    const nextExists = next < state.lines.length;

    if(isPremiseState(currentState.line)) {
        if(nextExists && isPremiseState(nextState.line)) {
            return <Inserter 
                indentationLevel={0}
            />
        }
        return <Inserter
            addBottom
            indentationLevel={0}
            addPremise={() => addLine({premise: ""}, next, 0)}
            addAssumption={() => addLine({assumption: ""}, next, 1)}
            addRuleApplication={() => addLine({formula: "", from: {}, rule: undefined}, next, 0)}
        />
        
    }

    let nextIndentation = 0;

    if(nextExists) {
        nextIndentation = nextState.indentationLevel.value;
        if(isAssumptionState(nextState.line)) {
            nextIndentation -= 1;
        }
    }

    let indentationDif = currentIndentation - nextIndentation;

    if(indentationDif < 0) indentationDif = 0;

    return <>{Array(indentationDif + 1).fill(0).map((_, index) => {
        const indentation = currentIndentation - index;

        return <Inserter key={index}
            indentationLevel={indentation}
            addRuleApplication={() => addLine({formula: "", from: {}, rule: undefined}, next, indentation)}
            addAbsurdity={indentation > 0 ? () => addLine({from: {}}, next, indentation): undefined}
            addAssumption={() => addLine({assumption: ""}, next, indentation + 1)}
        />
    })}</>
}