import { useTypedSelector } from "../hooks"
import { LineId } from "../types"

const FromReadOnly = ({id, index}: {id: LineId, index: number}) => {

    const value = useTypedSelector(state => {
        const ids = state.response.present.ids;
        const lines = state.response.present.lines;
        return ids.indexOf(lines[id].from[index]) + 1
    });

    return <div>{value}</div>
}

export default FromReadOnly;