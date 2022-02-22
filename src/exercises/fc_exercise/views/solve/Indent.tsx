import { useTypedSelector } from "../../../../hooks";
import type { LineId } from "../../../../types";
import BorderRepeat from "./BorderRepeat";

const Indent = ({id}: {id: LineId}) => {

    const indentation = useTypedSelector(state => state.response.lines[id].indentation);

    if(!indentation) return null;

    return <BorderRepeat times={indentation}/>
    
}

export default Indent;