import { useTypedSelector } from "../../../../hooks";
import { LineId } from "../../../../types";


const LineNumber = ({id}: {id: LineId}) => {

    const lineNumber = useTypedSelector(state => state.response.ids.indexOf(id) + 1);

    return <div>{lineNumber}</div>

}