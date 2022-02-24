import { useTypedSelector } from "../../../../hooks"
import { LineId } from "../../../../types"
import Border, { AssumptionBorder } from "./Border";

const Indent = ({id}: {id: LineId}) => {
    const indentation = useTypedSelector(state => state.response.lines[id].indentation);

    const assumption = useTypedSelector(state => !state.response.lines[id].from.length && state.response.lines[id].rule === undefined);

    return <>{Array(indentation + 1).fill(0).map((_, index) => (assumption && index === indentation) ? <AssumptionBorder key={index}/> : <Border key={index}/>)}</>
}

export default Indent;