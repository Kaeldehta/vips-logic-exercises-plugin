import { setFormula } from "../redux/response";
import Formula from "../components/Formula";
import type { LineId } from "../types";
import { useTypedSelector } from "../hooks";

const FormulaOrAbs = ({id}: {id: LineId}) => {

    const absurdity = useTypedSelector(state => state.response.lines[id].formula === undefined);

    if(absurdity) return <input disabled className="w-52 h-12 " value={"\u22A5"}/>

    return <Formula selector={state => state.response.lines[id].formula} actionCreator={(formula: string) => setFormula({id: id, formula})}/>
}

export default FormulaOrAbs;