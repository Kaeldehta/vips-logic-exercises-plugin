import Formula from "../../../../solve/Formula";
import type { LineId } from "../../../../types";
import LineWrapper from "../../LineWrapper";

const Line = ({id}: {id: LineId}) => {
    
    return <LineWrapper>
        <div className="h-12">{id}</div>
        <Formula id={id}/>
    </LineWrapper>
}

export default Line;