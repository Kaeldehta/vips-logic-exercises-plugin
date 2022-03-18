import CorrectComponent from "..";
import From from "../../components/From";
import Indent from "../../components/Indent";
import LabelOrNull from "../../components/LabelOrNull";
import LineNumber from "../../components/LineNumber";
import LineWrapper from "../../components/LineWrapper";
import MiddleIndent from "./MiddleIndent";
import { predRulesOptions } from "../../rules/fc_exercise";
import Formula from "../Formula";
import FromReadOnly from "../FromReadOnly";
import RuleOrNull from "../RuleOrNull";
import AbsOrNull from "./AbsOrNull";
import { useTypedSelector } from "./redux";

const Correct = () => {

    const ids = useTypedSelector(state => state.solution.ids);

    return <CorrectComponent>
        {ids.map((id) => <LineWrapper key={id}>
            <LineNumber solutionSelector={state => state.solution} id={id}/>
            <Indent solutionSelector={state => state.solution} id={id}/>
            <Formula id={id}/>
            <MiddleIndent id={id}/>
            <LabelOrNull solutionSelector={state => state.solution} id={id}/>
            <AbsOrNull id={id} />
            <RuleOrNull id={id} options={predRulesOptions}/>
            <div className="flex justify-start items-center"><From solutionSelector={state => state.solution} id={id} fromRender={FromReadOnly}/></div>
        </LineWrapper>)}
    </CorrectComponent>
}

export default Correct;

export {default as store} from "./redux";