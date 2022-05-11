import { FiPlusCircle, FiArrowDownCircle } from "react-icons/fi";
import Button from "../../components/Button";
import LineWrapper from "../../components/LineWrapper"
import useTreeSolution from "../../stores/tree";

const Inserter = ({id}: {id: string}) => {

    const hasChildren = useTreeSolution(state => !!state.lines[id].children.length);

    const addFalsum = useTreeSolution(state => state.addFalsum);

    const addAssumption = useTreeSolution(state => state.addAssumption);

    const addRuleLine = useTreeSolution(state => state.addRuleLine);

    const branch = useTreeSolution(state => state.branch);

    const absurdity = /* TODO */ true;

    if(absurdity) return null;

    return <LineWrapper className="w-line justify-center">
        {!hasChildren && <Button onClick={() => addFalsum(id)} content={"\u22A5"}/>}
        <Button icon={FiPlusCircle} onClick={() => addAssumption(id)} />
        <Button icon={FiArrowDownCircle} onClick={() => addRuleLine(id)} />
        {!hasChildren && <Button onClick={() => branch(id)} content="B"/>}
    </LineWrapper>
}

export default Inserter;
