import { State, useState } from "@hookstate/core";
import LineInput from "../LineInput"
import { Absurdity } from "./domain";

type Props = {
    state: State<Absurdity>
    max: number
}

export default ({state, max}: Props) => {

    //const state = useState(propState);
    
    return <>
    <div className="w-52 flex items-center justify-start">{"\u22A5"}</div>
    <div className="w-32 flex items-center justify-start">Abs.</div>
    <LineInput max={max} state={state.line1}/>
    <LineInput max={max} state={state.line2}/>
    </>
}