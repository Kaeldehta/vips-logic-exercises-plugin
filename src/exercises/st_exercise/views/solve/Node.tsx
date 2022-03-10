import {FiPlusCircle, FiArrowDownCircle} from "react-icons/fi";
import type { LineId } from "../../../../types";
import { useTypedSelector } from "../../../../hooks";
import { addFalsum, addAssumption, addRuleLine, branch } from "../../../../redux/response/st_exercise";
import Formula from "../../../../solve/Formula";
import LineNumber from "../../../../components/LineNumber";
import DispatchActionButton from "../../../../components/DispatchActionButton";
import From from "../../../../components/From";
import RuleSelectOrNull from "../../../../components/RuleSelect";
import { propRulesOptions } from "../../types";
import LineWrapper from "../../../fc_exercise/LineWrapper";
import RemoveButton from "../../../../components/RemoveButton";
import LabelOrNull from "../../../../components/LabelOrNull";

const AddLinesButtons = ({id}: {id: LineId}) => {

    return <div className="flex">
        <DispatchActionButton show action={addFalsum(id)} content={"\u22A5"}/>
        <DispatchActionButton show icon={FiPlusCircle} action={addAssumption(id)} />
        <DispatchActionButton show icon={FiArrowDownCircle} action={addRuleLine(id)} />
        <DispatchActionButton show action={branch(id)} content="B"/>
    </div>

}

const RenderChildren = ({id}: {id: LineId}) => {

    const children = useTypedSelector(state => state.response.present.lines[id].children);

    // const absurdity = useAbsurdityState(id);

    if(children.length == 0) return <AddLinesButtons id={id}/>

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

    return <>
        
        <LineWrapper className="w-line">
            <LineNumber id={id}/>
            <Formula id={id}/>

            <LabelOrNull id={id}/>
            
            <RuleSelectOrNull id={id} options={propRulesOptions} />

            <From id={id}/>
            <div className="ml-auto">
                <RemoveButton id={id}/>
            </div>

        </LineWrapper>

        <RenderChildren id={id}/>
        
    
    </>

}

export default NodeComponent;