import { SolutionSelector, useAnySelector } from "../hooks";
import { LineId } from "../types";

interface LineNumberProps {
    solutionSelector: SolutionSelector
    id: LineId
}

const LineNumber = ({solutionSelector, id}: LineNumberProps) => {

    const number = useAnySelector(state => solutionSelector(state).ids.indexOf(id) + 1);
    
    return <div className="shrink-0 flex items-center w-12">{number}</div>
}

export default LineNumber;