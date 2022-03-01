import Formula from "../../../../solve/Formula";
import type { LineId } from "../../../../types";
import LineWrapper from "../../LineWrapper";
import Inserter from "./Inserter";
import LineNumber from "../../../../components/LineNumber";
import DispatchActionButton from "../../../../components/DispatchActionButton";
import { FiMinusCircle } from "react-icons/fi";
import { removeLine } from "../../../../redux/response";
import Indent from "./Indent";
import RuleSelectOrNull from "../../../../components/RuleSelect";
import { propRulesOptions } from "../../types";
import From from "../../../../components/From";

const Line = ({id}: {id: LineId}) => {
    
    return <><LineWrapper>
        <LineNumber id={id}/>
        <Indent id={id}/>
        <Formula id={id}/>
        <RuleSelectOrNull id={id} options={propRulesOptions}/>
        <From id={id}/>
        <DispatchActionButton icon={FiMinusCircle} action={removeLine(id)}/>
    </LineWrapper>
    <Inserter id={id}/>
    </>
}

export default Line;