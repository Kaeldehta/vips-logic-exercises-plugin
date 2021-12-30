import BorderRepeat from "./BorderRepeat"
import LineWrapper from "./LineWrapper"

import {FiPlusCircle, FiArrowRightCircle, FiArrowLeftCircle, FiArrowDownCircle} from "react-icons/fi";

interface Props {
    indentationLevel: number,
    addLine?: () => void,
    addPremise?: () => void,
    addAssumption?: () => void,
    addAbsurdity?: () => void,
    removeLastBorder?: boolean
}

export default ({removeLastBorder, indentationLevel, addLine, addPremise, addAbsurdity, addAssumption}: Props) => {

    return <LineWrapper height="h-8" indentationLevel={indentationLevel}>
        <div className="flex w-52 justify-center items-center gap-4">
        {addLine && <button className="group-hover:flex hidden" type="button" onClick={addLine}><FiArrowDownCircle/></button>}
        {addAssumption && <button className="group-hover:flex hidden" type="button" onClick={addAssumption}><FiArrowRightCircle/></button>}
        {addAbsurdity && <button className="group-hover:flex hidden" type="button" onClick={addAbsurdity}><FiArrowLeftCircle/></button>}
        {addPremise && <button className="group-hover:flex hidden" type="button" onClick={addPremise}><FiPlusCircle/></button>}
        </div>
</LineWrapper>
}