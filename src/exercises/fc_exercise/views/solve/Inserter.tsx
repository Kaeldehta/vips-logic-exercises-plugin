import LineWrapper from "../../LineWrapper"

import {FiPlusCircle, FiArrowRightCircle, FiArrowDownCircle} from "react-icons/fi";

interface Props {
    indentationLevel: number,
    addRuleApplication?: () => void,
    addPremise?: () => void,
    addAssumption?: () => void,
    addAbsurdity?: () => void,
    addBottom?: boolean,
    reduceHeight?: boolean
}

export default ({reduceHeight, addBottom, indentationLevel, addRuleApplication, addPremise, addAbsurdity, addAssumption}: Props) => {

    return <LineWrapper>
        <div className="flex w-52 justify-center items-center gap-4">
        {addRuleApplication && <button className="group-hover:flex hidden" type="button" onClick={addRuleApplication}><FiArrowDownCircle/></button>}
        {addAssumption && <button className="group-hover:flex hidden" type="button" onClick={addAssumption}><FiArrowRightCircle/></button>}
        {addAbsurdity && <button className="group-hover:flex hidden" type="button" onClick={addAbsurdity}>{"\u22A5"}</button>}
        {addPremise && <button className="group-hover:flex hidden" type="button" onClick={addPremise}><FiPlusCircle/></button>}
        </div>
</LineWrapper>
}