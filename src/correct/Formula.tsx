import { LineId } from "../types";
import { renderFormulaAsHTML } from "../utils";
import { useTypedSelector } from "./redux";

const Formula = ({id}: {id: LineId}) => {

    const value = useTypedSelector(state => state.solution.lines[id].formula);

    return <div className="flex items-center justify-start w-60">
        {value !== undefined ? renderFormulaAsHTML(value) : "\u22A5"}
    </div>
}

export default Formula;