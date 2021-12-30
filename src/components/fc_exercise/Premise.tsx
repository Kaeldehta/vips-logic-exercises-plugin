import FormulaInput from "../FormulaInput"
import { Premise } from "./domain"

interface Props {
    premise: Premise,
    setPremise: (premise: Premise) => void,
}

export default ({premise, setPremise}: Props) => 
<>
    <FormulaInput formula={premise} setFormula={setPremise}/>
    <div className="flex items-center">Prem.</div>
</>
