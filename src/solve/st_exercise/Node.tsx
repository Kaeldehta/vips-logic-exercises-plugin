import type { LineId } from "../../types";
import { useTypedSelector } from "../../hooks";
import Formula from "../../solve/Formula";
import LineNumber from "../../components/LineNumber";
import From from "../../components/From";
import RuleSelectOrNull from "../../components/RuleSelect";
import { propRulesOptions, predRulesOptions } from "../../rules/st_exercise";
import LineWrapper from "../../components/LineWrapper";
import RemoveButton from "../../components/RemoveButton";
import LabelOrNull from "../../components/LabelOrNull";
import Inserter from "./Inserter";
import FromSelect from "../FromSelect";

const RenderChildren = ({id}: {id: LineId}) => {

    const children = useTypedSelector(state => state.response.present.lines[id].children);

    if(children.length == 0) return null;

    if(children.length == 1) return <NodeComponent id={children[0]}/>

    return <>
        <LineThing/>
        <div className="flex gap-8">
            <div className="flex flex-col gap-1 items-center justify-start">
                <NodeComponent id={children[0]}/>
            </div>
            <div className="flex flex-col gap-1 items-center justify-start">
                <NodeComponent id={children[1]}/>
            </div>
        </div>
    </>
}

const LineThing = () => <svg className="h-12 w-full">
    <line x1="50%" y1="0%" x2="25%" y2="100%" stroke="black"/>
    <line x1="75%" y1="100%" x2="50%" y2="0%" stroke="black"/>
</svg>

const NodeComponent = ({id}: {id: LineId}) => {

    const predicateLogic = useTypedSelector(state => state.answer.predicateLogic);

    return <>
        
        <LineWrapper className="w-line">
            <LineNumber id={id}/>
            <Formula id={id}/>

            <LabelOrNull id={id}/>
            
            <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions} />

            <From id={id} fromRender={FromSelect}/>
            <div className="ml-auto">
                <RemoveButton id={id}/>
            </div>

        </LineWrapper>

        <Inserter id={id}/>

        <RenderChildren id={id}/>
        
    
    </>

}

export default NodeComponent;