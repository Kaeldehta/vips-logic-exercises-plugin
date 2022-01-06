import {isAssumptionState, Line, ProofLine} from "./domain"
import {State, useState} from "@hookstate/core";
import ProofLineComponent from "./ProofLine";
import { nanoid } from "nanoid";
import Inserter from "./Inserter";
import InserterWrapper from "./InserterWrapper";

export const wrapState = (state: State<ProofLine[]>) => ({
    state: state,
    addLine: (line: Line, index: number, indentationLevel: number) => {
        const newId = nanoid();

        state.merge(p => {
            const merge: Record<number, ProofLine> = {};
            merge[index] = {id: newId, line, indentationLevel};
            p.forEach((value, i) => {
                if(i >= index) {
                    merge[i + 1] = value;
                }   
            });
            return merge;
        })
    }
})

export default ({lines: defaultLines}: {lines: ProofLine[]}) => {

    const {state: linesState, addLine} = wrapState(useState(defaultLines?? []));

    return <div>

        {(linesState.length == 0 || isAssumptionState(linesState[0].line)) &&
            <Inserter 
                indentationLevel={0}
                addAssumption={() => addLine({assumption: ""}, 0, 1)}
                addPremise={() => addLine({premise: ""}, 0, 0)}
            />
        }

        {linesState.map((line, index) => {

            return <div key={line.id.value}>
                <ProofLineComponent  state={line} index={index} linesState={linesState}/>
                <InserterWrapper linesState={linesState} index={index}/>
                </div>
        })}
    </div>
}