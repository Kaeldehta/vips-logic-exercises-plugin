import { useTypedSelector } from "../hooks";
import { LineId } from "../types";
import { renderFormulaAsHTML } from "../utils";

const Formula = ({id}: {id: LineId}) => {

    const value = useTypedSelector(state => state.response.present.lines[id].formula);

    return <div className="flex items-center justify-start w-60">
        {value !== undefined ? renderFormulaAsHTML(value) : "\u22A5"}
    </div>
}

export default Formula;