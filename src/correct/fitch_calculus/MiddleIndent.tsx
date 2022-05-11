import { LineId } from "../../types";
import { useTypedSelector } from "./redux";

const MiddleIndent = ({id}: {id: LineId}) => {

    const maxIndentation = useTypedSelector(state => {
        const indentations = Object.values(state.solution.lines).map(({indentation}) => indentation);

        return Math.max(...indentations);
    })

    const indentation = useTypedSelector(state => state.solution.lines[id].indentation);

    return <>
    {Array(maxIndentation - indentation).fill(0).map((_, index) => <div key={index} className="w-10"></div>)}
    </>

}

export default MiddleIndent;