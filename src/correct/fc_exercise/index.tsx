import CorrectComponent from "..";
import From from "../../components/From";
import Indent from "../../components/Indent";
import LabelOrNull from "../../components/LabelOrNull";
import LineNumber from "../../components/LineNumber";
import LineWrapper from "../../components/LineWrapper";
import { useTypedSelector } from "../../hooks";
import { predRulesOptions } from "../../rules/fc_exercise";
import Formula from "../Formula";
import FromReadOnly from "../FromReadOnly";
import RuleOrNull from "../RuleOrNull";

const Correct = () => {

    const ids = useTypedSelector(state => state.response.present.ids);

    return <CorrectComponent separator={<div>{"\u22A2"}<sub>FC</sub></div>}>
        {ids.map((id) => <LineWrapper>
            <LineNumber id={id}/>
            <Indent id={id}/>
            <Formula id={id}/>
            <LabelOrNull id={id}/>
            <RuleOrNull id={id} options={predRulesOptions}/>
            <From id={id} fromRender={FromReadOnly}/>
        </LineWrapper>)}
    </CorrectComponent>
}

export default Correct;