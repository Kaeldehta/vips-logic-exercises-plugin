import { FiPlusCircle, FiArrowDownCircle } from "react-icons/fi";
import DispatchActionButton from "../../components/DispatchActionButton";
import LineWrapper from "../../components/LineWrapper"
import { useAbsurdityState } from "../../hooks";
import { LineId } from "../../types";
import { addFalsum, addAssumption, addRuleLine, branch, useTypedSelector } from "./redux";

const Inserter = ({id}: {id: LineId}) => {

    const hasChildren = useTypedSelector(state => !!state.solution.present.lines[id].children.length);

    const absurdity = useAbsurdityState(state => state.solution.present, id);

    if(absurdity) return null;

    return <LineWrapper className="w-line justify-center">
        {!hasChildren && <DispatchActionButton action={addFalsum(id)} content={"\u22A5"}/>}
        <DispatchActionButton icon={FiPlusCircle} action={addAssumption(id)} />
        <DispatchActionButton icon={FiArrowDownCircle} action={addRuleLine(id)} />
        {!hasChildren && <DispatchActionButton action={branch(id)} content="B"/>}
    </LineWrapper>
}

export default Inserter;
