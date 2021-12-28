import FormulaInput from "../FormulaInput"
import {useFormula} from "./context";

export default () => 
<>
    <FormulaInput useFormula={useFormula}/>
    <div className="flex items-center">Ass.</div>
</>
