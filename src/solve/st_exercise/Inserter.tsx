import { FiPlusCircle, FiArrowDownCircle } from "react-icons/fi";
import DispatchActionButton from "../../components/DispatchActionButton";
import LineWrapper from "../../components/LineWrapper"
import { useAbsurdityState, useTypedSelector } from "../../hooks";
import { addAssumption, addFalsum, addRuleLine, branch } from "../../redux/response/st_exercise";
import { LineId } from "../../types";

const Inserter = ({id}: {id: LineId}) => {

    const hasChildren = useTypedSelector(state => !!state.response.present.lines[id].children.length);

    const absurdity = useAbsurdityState(id);

    if(absurdity) return null;

    return <LineWrapper className="w-line justify-center">
        {!hasChildren && <DispatchActionButton action={addFalsum(id)} content={"\u22A5"}/>}
        <DispatchActionButton icon={FiPlusCircle} action={addAssumption(id)} />
        <DispatchActionButton icon={FiArrowDownCircle} action={addRuleLine(id)} />
        {!hasChildren && <DispatchActionButton action={branch(id)} content="B"/>}
    </LineWrapper>
}

export default Inserter;
