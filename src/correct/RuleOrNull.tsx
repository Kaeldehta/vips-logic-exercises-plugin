import { useTypedSelector } from "../hooks";
import { LineId } from "../types";


const RuleOrNull = ({id, options}: {id: LineId, options: Array<{value: string, label: string}>}) => {
    

    const rule = useTypedSelector(state => state.response.present.lines[id].rule);

    if(!rule) return null;

    return <div>{options.find(({value}) => value === rule).label}</div>
}

export default RuleOrNull;