import { useAbsurdityState } from "../../hooks";
import { LineId } from "../../types";

const AbsOrNull = ({id}: {id: LineId}) => {

    const absurdity = useAbsurdityState(state => state.solution, id);

    if(absurdity) return <div>Abs.,</div>

    return null;
}

export default AbsOrNull;