import { setFormula } from "../redux/response";
import RootFormula from "../components/Formula";
import type { LineId } from "../types";
import { useTypedSelector } from "../hooks";

const Formula = ({id}: {id: LineId}) => {

    const absurdity = useTypedSelector(state => state.response.lines[id].formula === undefined);

    if(absurdity) return <input disabled className="w-52 h-12 " value={"\u22A5"}/>

    return <RootFormula selector={state => state.response.lines[id].formula} actionCreator={(formula: string) => setFormula({lineId: id, formula})}/>
}

export default Formula;