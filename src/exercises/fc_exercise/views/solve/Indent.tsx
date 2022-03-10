import { useAssumptionState, useTypedSelector } from "../../../../hooks"
import { LineId } from "../../../../types"
import Border, { AssumptionBorder } from "./Border";

const Indent = ({id}: {id: LineId}) => {
    const indentation = useTypedSelector(state => state.response.present.lines[id].indentation);

    const assumption = useAssumptionState(id);

    return <>{Array(indentation + 1).fill(0).map((_, index) => (assumption && index === indentation) ? <AssumptionBorder key={index}/> : <Border key={index}/>)}</>
}

export default Indent;