import { useTypedSelector } from "../../../../hooks";
import { LineId } from "../../../../types";
import BorderRepeat from "./BorderRepeat";

const Indent = ({id}: {id: LineId}) => {

    const indentation = useTypedSelector(state => state.response.lines[id].indentation)

    return <BorderRepeat times={indentation}/>
    
}