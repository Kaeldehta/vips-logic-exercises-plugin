import { useAssumptionState, usePremiseState, useTypedSelector } from "../../../../hooks"
import { LineId } from "../../../../types"

const LabelOrNull = ({id}: {id: LineId}) => {

    const premise = usePremiseState(id);

    const assumption = useAssumptionState(id);

    if(premise) return <div>Prem.</div>

    if(assumption) return <div>Ass.</div>

    return null;

}

export default LabelOrNull;