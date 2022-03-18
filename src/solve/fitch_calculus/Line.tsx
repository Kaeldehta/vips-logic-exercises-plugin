import Formula from "../Formula";
import type { LineId } from "../../types";
import LineWrapper from "../../components/LineWrapper";
import Inserter from "./Inserter";
import LineNumber from "../../components/LineNumber";
import Indent from "../../components/Indent";
import RuleSelectOrNull from "../RuleSelect";
import { propRulesOptions, predRulesOptions } from "../../rules/fc_exercise"
import From from "../../components/From";
import LabelOrNull from "../../components/LabelOrNull";
import FromSelect from "../FromSelect";
import RemoveButton from "../RemoveButton";
import { useTypedSelector } from "./redux";

const Line = ({id}: {id: LineId}) => {

    const predicateLogic = useTypedSelector(state => state.task.predicateLogic);
    
    return <><LineWrapper>
        <LineNumber solutionSelector={state => state.solution.present} id={id}/>
        <Indent solutionSelector={state => state.solution.present} id={id}/>
        <Formula id={id}/>
        <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions}/>
        <LabelOrNull solutionSelector={state => state.solution.present} id={id}/>
        <From solutionSelector={state => state.solution.present} id={id} fromRender={FromSelect}/>
        <RemoveButton id={id}/>
    </LineWrapper>
    <Inserter id={id}/>
    </>
}

export default Line;