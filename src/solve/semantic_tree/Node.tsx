import type { LineId } from "../../types";
import Formula from "../Formula";
import LineNumber from "../../components/LineNumber";
import From from "../../components/From";
import RuleSelectOrNull from "../RuleSelect";
import { propRulesOptions, predRulesOptions } from "../../rules/st_exercise";
import LineWrapper from "../../components/LineWrapper";
import RemoveButton from "../RemoveButton";
import LabelOrNull from "../../components/LabelOrNull";
import Inserter from "./Inserter";
import FromSelect from "../FromSelect";
import { useTypedSelector } from "./redux";

const RenderChildren = ({id}: {id: LineId}) => {

    const children = useTypedSelector(state => state.solution.present.lines[id].children);

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

    const predicateLogic = useTypedSelector(state => state.task.predicateLogic);

    return <>
        
        <LineWrapper className="w-line">
            <LineNumber solutionSelector={state => state.solution.present} id={id}/>
            <Formula id={id}/>

            <LabelOrNull solutionSelector={state => state.solution.present} id={id}/>
            
            <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions} />

            <From solutionSelector={state => state.solution.present} id={id} fromRender={FromSelect}/>
            <div className="ml-auto">
                <RemoveButton id={id}/>
            </div>

        </LineWrapper>

        <Inserter id={id}/>

        <RenderChildren id={id}/>
        
    
    </>

}

export default NodeComponent;