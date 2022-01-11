import { State } from "@hookstate/core"
import FormulaInput from "../FormulaInput"
import { Premise } from "./domain"

interface Props {
    state: State<Premise>,
}

export default ({state}: Props) => {

    return <>
        <FormulaInput state={state.premise}/>
        <div className="flex items-center">Prem.</div>
    </> 
}


