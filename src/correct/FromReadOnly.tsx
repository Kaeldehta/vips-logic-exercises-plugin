import { useFromSuffix } from "../hooks"
import { LineId } from "../types"
import { useTypedSelector } from "./redux";

const FromReadOnly = ({id, index}: {id: LineId, index: number}) => {

    const value = useTypedSelector(state => {
        const ids = state.solution.ids;
        const lines = state.solution.lines;
        return ids.indexOf(lines[id].from[index]) + 1
    });

    const suffix = useFromSuffix(state => state.solution, id, index);

    return <><div>({value})</div>{suffix}</>
}

export default FromReadOnly;