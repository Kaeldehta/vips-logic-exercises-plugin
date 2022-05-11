import { LineId } from "../types";
import { useTypedSelector } from "./redux";

const RuleOrNull = ({id, options}: {id: LineId, options: Array<{value: string, label: string}>}) => {
    
    const rule = useTypedSelector(state => state.solution.lines[id].rule);

    if(!rule) return null;

    return <div>{options.find(({value}) => value === rule).label},</div>
}

export default RuleOrNull;