import { State, useState } from "@hookstate/core";
import LineInput from "./LineInput"
import { Absurdity, ProofLine } from "./domain";

type Props = {
    state: State<Absurdity>
    linesState: State<ProofLine[]>
}

export default ({state, linesState}: Props) => {
    
    return <>
    <div className="w-52 flex items-center justify-start">{"\u22A5"}</div>
    <div className="w-32 flex items-center justify-start">Abs.</div>
    <LineInput state={state.from.line1} linesState={linesState}/>
    {", "}
    <LineInput state={state.from.line2} linesState={linesState}/>
    </>
}