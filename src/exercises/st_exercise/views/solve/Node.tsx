import RuleSelect from "./RuleSelect";

import {FiPlusCircle, FiArrowDownCircle} from "react-icons/fi";
import { LineId } from "../../../../types";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../hooks";
import { addFalsum, addAssumption, addRuleLine, branch } from "../../../../redux/response/st_exercise";
import Formula from "../../../../solve/Formula";
import From from "../../../../solve/From";

const AddLinesButtons = ({id}: {id: LineId}) => {

    const dispatch = useDispatch();

    return <div>
        <button onClick={() => dispatch(addFalsum(id))}>{"\u22A5"}</button>
        <button onClick={() => dispatch(addAssumption(id))}><FiPlusCircle/></button>
        <button onClick={() => dispatch(addRuleLine(id))}><FiArrowDownCircle/></button>
        <button onClick={() => dispatch(branch(id))}>Branch</button>
    </div>

}

const RenderChildren = ({id}: {id: LineId}) => {

    const children = useTypedSelector(state => state.response.lines[id].children);

    return <div className="flex">
        {children ? children.map((childId) => <NodeComponent key={childId} id={childId}/>) : <AddLinesButtons id={id}/>}
    </div>
}

const NodeComponent = ({id}: {id: LineId}) => {

    return <div className="flex flex-col items-center">

        <div className="flex items-center">
            <Formula id={id}/>

            <RuleSelect id={id}/>

            <From id={id}/>
        </div>
    
        <RenderChildren id={id}/>
    
    </div>

}

export default NodeComponent;