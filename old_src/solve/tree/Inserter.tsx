import { useAtomValue, useSetAtom } from "jotai";
import { FiPlusCircle, FiArrowDownCircle } from "react-icons/fi";
import Button from "../../components/Button";
import LineWrapper from "../../components/LineWrapper"
import { addAssumptionAtom, addFalsumAtom, addRuleLineAtom, branchAtom, hasChildrenAtom } from "../atoms/tree";

const Inserter = ({id}: {id: string}) => {

    const hasChildren = useAtomValue(hasChildrenAtom(id));

    const addFalsum = useSetAtom(addFalsumAtom);

    const addAssumption = useSetAtom(addAssumptionAtom);

    const addRuleLine = useSetAtom(addRuleLineAtom);

    const branch = useSetAtom(branchAtom);

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
