import { setFormula } from "../redux/response";
import RootFormula from "../components/Formula";
import type { LineId } from "../types";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";

const Formula = ({id}: {id: LineId}) => {

    const dispatch = useDispatch();

    const formula = useTypedSelector(state => state.response.lines[id].formula);

    console.log("Rerender Formula Input ", id)

    if(formula == undefined) return <input disabled className="w-52 h-12 " value={"\u22A5"}/>

    return <RootFormula value={formula} setValue={(value) => dispatch(setFormula({lineId: id, formula: value}))}/>
}

export default Formula;