import { setFormula } from "../redux/response";
import RootFormula from "../components/Formula";
import { LineId } from "../types";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";

const Formula = ({id}: {id: LineId}) => {

    const dispatch = useDispatch();

    const formula = useTypedSelector(state => state.response.lines[id].formula);

    console.log("Rerender Formula Input ", id)

    if(formula == undefined) return <div className="w-52 h-12">{"\u22A5"}</div>

    return <RootFormula value={formula} setValue={(value) => dispatch(setFormula({lineId: id, formula: value}))}/>
}

export default Formula;