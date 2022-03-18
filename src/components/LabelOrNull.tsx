import { SolutionSelector, useAssumptionState, usePremiseState } from "../hooks"
import { LineId } from "../types"

const LabelOrNull = ({solutionSelector, id}: {id: LineId, solutionSelector: SolutionSelector}) => {

    const premise = usePremiseState(solutionSelector, id);

    const assumption = useAssumptionState(solutionSelector, id);

    if(premise) return <div>Prem.</div>

    if(assumption) return <div>Ass.</div>

    return null;

}

export default LabelOrNull;