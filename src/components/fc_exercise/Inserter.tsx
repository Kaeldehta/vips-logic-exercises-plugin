import LineWrapper from "./LineWrapper"

import {FiPlusCircle, FiArrowRightCircle, FiArrowLeftCircle, FiArrowDownCircle} from "react-icons/fi";

interface Props {
    indentationLevel: number,
    addLine?: () => void,
    addPremise?: () => void,
    addSubproof?: () => void,
    addAbsurdity?: () => void,
}

export default ({indentationLevel, addLine, addPremise, addAbsurdity, addSubproof}: Props) => {

    return <LineWrapper height="h-8" indentationLevel={indentationLevel}>
        <div className="flex w-52 justify-center items-center gap-4">
        {addLine && <button className="group-hover:flex hidden" type="button" onClick={addLine}><FiArrowDownCircle/></button>}
        {addSubproof && <button className="group-hover:flex hidden" type="button" onClick={addSubproof}><FiArrowRightCircle/></button>}
        {addAbsurdity && <button className="group-hover:flex hidden" type="button" onClick={addAbsurdity}>{"\u22A5"}</button>}
        {addPremise && <button className="group-hover:flex hidden" type="button" onClick={addPremise}><FiPlusCircle/></button>}
        </div>
</LineWrapper>
}