import Formula from "../Formula";
import LineWrapper from "../../components/LineWrapper";
import Inserter from "./Inserter";
import LineNumber from "./LineNumber";
import Indent from "../../components/Indent";
import RuleSelectOrNull from "../RuleSelect";
import { propRulesOptions, predRulesOptions } from "../../rules/fc"
import From from "../../components/From";
import LabelOrNull from "../../components/LabelOrNull";
import FromSelect from "../FromSelect";
import RemoveButton from "./RemoveButton";
import { getTask } from "../../utils";

const Line = ({id}: {id: string}) => {

    const predicateLogic = getTask<{predicateLogic: boolean}>()?.predicateLogic;
    
    return <><LineWrapper>
        <LineNumber id={id}/>
        <Indent id={id}/>
        <Formula id={id}/>
        <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions}/>
        {/* <LabelOrNull solutionSelector={state => state.solution.present} id={id}/> */}
        {/* <From solutionSelector={state => state.solution.present} id={id} fromRender={FromSelect}/> */}
        <RemoveButton id={id}/>
    </LineWrapper>
    <Inserter id={id}/>
    </>
}

export default Line;