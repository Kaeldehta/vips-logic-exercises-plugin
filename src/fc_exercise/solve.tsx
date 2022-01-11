import {isAssumptionState, Line, Proof, ProofLine} from "./domain"
import {State, useState} from "@hookstate/core";
import ProofLineComponent from "./ProofLine";
import { nanoid } from "nanoid";
import Inserter from "./Inserter";
import InserterWrapper from "./InserterWrapper";
import { render } from "react-dom";
import "./solve.css";
import { useEffect } from "react";

export const wrapState = (state: State<Proof>) => ({
    state: state,
    addLine: (line: Line, index: number, indentationLevel: number) => {
        const newId = nanoid();

        state.lines.merge(p => {
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

const Solve =  ({lines: defaultLines}: {lines: ProofLine[]}) => {

    const {state: linesState, addLine} = wrapState(useState({lines: defaultLines?? []}));

    return <div>

        {(linesState.lines.length == 0 || isAssumptionState(linesState.lines[0].line)) &&
            <Inserter 
                indentationLevel={0}
                addBottom
                addAssumption={() => addLine({assumption: ""}, 0, 1)}
                addPremise={() => addLine({premise: ""}, 0, 0)}
            />
        }

        {linesState.lines.map((line, index) => {

            return <div key={line.id.value}>
                <ProofLineComponent  state={line} linesState={linesState.lines}/>
                <InserterWrapper proofState={linesState} index={index}/>
                </div>
        })}
    </div>
}
 
const element = document.getElementById("exercise-container");

declare const REACT_PROPS: {solution: {lines: ProofLine[]}};

render(<Solve lines={REACT_PROPS.solution.lines}/>, element);