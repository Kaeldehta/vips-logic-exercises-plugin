import { useTypedSelector } from "../hooks"
import { LineId } from "../types"

const LineNumber = ({id}: {id: LineId}) => {

    const number = useTypedSelector(state => state.response.ids.indexOf(id) + 1);
    
    return <div className="flex items-center w-12">{number}</div>
}

export default LineNumber;