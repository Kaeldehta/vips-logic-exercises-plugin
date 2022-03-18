import { setFormula, useTypedSelector } from "./redux";
import Formula from "../components/Formula";
import type { LineId } from "../types";
import { useDispatch } from "react-redux";

const FormulaOrAbs = ({id}: {id: LineId}) => {

    const value = useTypedSelector(state => state.solution.present.lines[id].formula);

    const dispatch = useDispatch();

    if(value === undefined) return <div className="w-56 h-12 pl-2 flex items-center justify-start">{"\u22A5"}</div>

    return <Formula value={value} setValue={(formula: string) => dispatch(setFormula({id: id, formula}))}/>
}

export default FormulaOrAbs;