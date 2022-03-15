import Formula from "../../solve/Formula";
import type { LineId } from "../../types";
import LineWrapper from "../../components/LineWrapper";
import Inserter from "./Inserter";
import LineNumber from "../../components/LineNumber";
import DispatchActionButton from "../../components/DispatchActionButton";
import { FiMinusCircle } from "react-icons/fi";
import { removeLine } from "../../redux/response";
import Indent from "./Indent";
import RuleSelectOrNull from "../../components/RuleSelect";
import { propRulesOptions, predRulesOptions } from "../../rules/fc_exercise"
import From from "../../components/From";
import LabelOrNull from "../../components/LabelOrNull";
import { useTypedSelector } from "../../hooks";

const Line = ({id}: {id: LineId}) => {

    const predicateLogic = useTypedSelector(state => state.answer.predicateLogic);
    
    return <><LineWrapper>
        <LineNumber id={id}/>
        <Indent id={id}/>
        <Formula id={id}/>
        <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions}/>
        <LabelOrNull id={id}/>
        <From id={id}/>
        <DispatchActionButton icon={FiMinusCircle} action={removeLine(id)}/>
    </LineWrapper>
    <Inserter id={id}/>
    </>
}

export default Line;