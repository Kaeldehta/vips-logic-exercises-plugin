import FormulaInput from "../FormulaInput"
import { Assumption } from "./domain";

type Props = {
    assumption: Assumption
    setAssumption: (assumption: Assumption) => void
}

export default ({assumption, setAssumption}: Props) => 
<>
    <FormulaInput formula={assumption} setFormula={setAssumption}/>
    <div className="flex items-center">Ass.</div>
</>
