import RuleSelect from "./RuleSelect";

import {FiPlusCircle, FiArrowDownCircle} from "react-icons/fi";
import type { LineId } from "../../../../types";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks";
import { addFalsum, addAssumption, addRuleLine, branch } from "../../../../redux/response/st_exercise";
import Formula from "../../../../solve/Formula";
import From from "../../../../solve/From";

const AddLinesButtons = ({id}: {id: LineId}) => {

    const dispatch = useDispatch();

    return <div className="flex">
        <button className="flex items-center" onClick={() => dispatch(addFalsum(id))}>{"\u22A5"}</button>
        <button className="flex items-center" onClick={() => dispatch(addAssumption(id))}><FiPlusCircle/></button>
        <button className="flex items-center" onClick={() => dispatch(addRuleLine(id))}><FiArrowDownCircle/></button>
        <button className="flex items-center" onClick={() => dispatch(branch(id))}>Branch</button>
    </div>

}

const RenderChildren = ({id}: {id: LineId}) => {

    const children = useTypedSelector(state => state.response.lines[id].children);

    if(children.length == 0) return <AddLinesButtons id={id}/>

    if(children.length == 1) return <NodeComponent id={children[0]}/>

    return <div>
        <LineThing/>
        <div className="flex gap-8">
            <NodeComponent id={children[0]}/>
            <NodeComponent id={children[1]}/>
        </div>
    </div>
}

const LineThing = () => <svg className="h-12 w-full">
    <line x1="50%" y1="0%" x2="25%" y2="100%" stroke="black"/>
    <line x1="75%" y1="100%" x2="50%" y2="0" stroke="black"/>
</svg>

const NodeComponent = ({id}: {id: LineId}) => {

    return <div className="flex flex-col items-center justify-start">
        
        <div className="flex items-center gap-2">
            <Formula id={id}/>

            <RuleSelect id={id}/>

            <From id={id}/>
        </div>
    
        <RenderChildren id={id}/>
    
    </div>

}

export default NodeComponent;