import Formula from "../Formula";
import LineNumber from "../../components/LineNumber";
import From from "../../components/From";
import RuleSelectOrNull from "../RuleSelect";
import { propRulesOptions, predRulesOptions } from "../../rules/tree";
import LineWrapper from "../../components/LineWrapper";
import RemoveButton from "../fc/RemoveButton";
import LabelOrNull from "../../components/LabelOrNull";
import Inserter from "./Inserter";
import FromSelect from "../FromSelect";
import { getTask } from "../../utils";
import { useAtomValue } from "jotai";
import { childrenAtom } from "../atoms/tree";

const RenderChildren = ({id}: {id: string}) => {

    const children = useAtomValue(childrenAtom(id));

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

const NodeComponent = ({id}: {id: string}) => {

    const predicateLogic = getTask<{predicateLogic: boolean}>()?.predicateLogic;

    return <>
        
        <LineWrapper className="w-line">
            {/* <LineNumber solutionSelector={state => state.solution.present} id={id}/> */}
            {/* <Formula id={id}/> */}

            {/* <LabelOrNull solutionSelector={state => state.solution.present} id={id}/> */}
            
            {/* <RuleSelectOrNull id={id} options={predicateLogic ? predRulesOptions : propRulesOptions} /> */}

            {/* <From solutionSelector={state => state.solution.present} id={id} fromRender={FromSelect}/> */}
            <div className="ml-auto">
                <RemoveButton id={id}/>
            </div>

        </LineWrapper>

        <Inserter id={id}/>

        <RenderChildren id={id}/>
        
    
    </>

}

export default NodeComponent;