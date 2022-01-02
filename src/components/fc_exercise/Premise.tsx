import { useState, State } from "@hookstate/core"
import FormulaInput from "../FormulaInput"
import { Premise } from "./domain"

interface Props {
    state: State<Premise>,
}

export default ({state}: Props) => 
<>
    <FormulaInput state={state}/>
    <div className="flex items-center">Prem.</div>
</>

