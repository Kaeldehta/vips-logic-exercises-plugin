import BorderRepeat from "./BorderRepeat"
import LineWrapper from "./LineWrapper"

import {FiPlusCircle} from "react-icons/fi";

interface Props {
    indentationLevel: number,
    addLine?: () => void
}

export default ({indentationLevel, addLine}: Props) => {

    return <LineWrapper height="h-8">
        <BorderRepeat times={indentationLevel}/>
        <div className="flex w-10 justify-center items-center"></div>
        {addLine && <button type="button" onClick={addLine}><FiPlusCircle/></button>}
    </LineWrapper>
}