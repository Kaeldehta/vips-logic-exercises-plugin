import LineWrapper from "../../components/LineWrapper"
import { FiArrowRightCircle, FiArrowDownCircle, FiPlusCircle } from "react-icons/fi";
import Border from "../../components/Border";
import Button from "../../components/Button";
import { useAtomValue, useSetAtom } from "jotai";
import { indentationAtom, indentationDeltaAtom, indexAtom, insertAbsurdityAtom, insertAssumptionAtom, insertPremiseAtom, insertRuleLineAtom, isPremiseAtom } from "../atoms/fc";

interface InserterProps {
    id: string
}

const Inserter = ({id}: InserterProps) => {

    const index = useAtomValue(indexAtom(id));

    const insertAssumption = useSetAtom(insertAssumptionAtom);

    const insertPremise = useSetAtom(insertPremiseAtom);

    const insertAbsurdity = useSetAtom(insertAbsurdityAtom);

    const insertRuleLine = useSetAtom(insertRuleLineAtom);

    const indentation = useAtomValue(indentationAtom(id));
    
    const premise = useAtomValue(isPremiseAtom(id));

    const lastPremise = /* TODO */ true;

    const indentationDelta = useAtomValue(indentationDeltaAtom(id));
    
    return <>
    {Array(-Math.min(indentationDelta, 0) + 1).fill(0).map((_, indentationOffset) => {

        const newIndentation = indentation - indentationOffset;

        return <LineWrapper key={newIndentation}>
            <div className="w-12"/>
            {Array(newIndentation + 1).fill(0).map((_, index) => <Border key={index}/>)}
            <div className="w-52 border-2 p-1 border-white border-solid flex justify-evenly">
                {(!premise || lastPremise) && <><Button icon={FiArrowRightCircle} onClick={() => insertAssumption({index: index + 1, indentation: newIndentation + 1} )}/>
                <Button onClick={() => insertAbsurdity({index: index + 1, indentation: newIndentation})} content={"\u22A5"}/>
                <Button icon={FiArrowDownCircle} onClick={() => insertRuleLine({index: index + 1, indentation: newIndentation})}/></>}
                {premise && <Button icon={FiPlusCircle} onClick={() => insertPremise(index + 1)}/>}
            </div>
        </LineWrapper>

    })}
    </>
}

export default Inserter;