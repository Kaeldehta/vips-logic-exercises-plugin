import LineWrapper from "../../components/LineWrapper"

import {FiArrowRightCircle, FiArrowDownCircle, FiPlusCircle} from "react-icons/fi";
import Border from "../../components/Border";
import useFCSolution from "../../stores/fc";
import Button from "../../components/Button";
import { isAssumption, isPremise } from "../../utils/fc";

const Inserter = ({id}: {id: string}) => {

    const index = useFCSolution(state => state.ids.indexOf(id));

    const indentation = useFCSolution(state => state.lines[id].indentation);

    const insertAbsurdity = useFCSolution(state => state.insertAbsurdity)

    const insertAssumption = useFCSolution(state => state.insertAssumption);

    const insertRuleLine = useFCSolution(state => state.insertRuleLine);

    const insertPremise = useFCSolution(state => state.insertPremise);
    
    const premise = useFCSolution(state => isPremise(state.lines[id]));

    const lastPremise = /* TODO */ true;

    const indentationDelta = useFCSolution(state => {

        const next = state.lines[state.ids[index + 1]];

        if(next) {
            if(isAssumption(next)) {
                if(next.indentation > indentation) return 0;
                return -indentation
            }
            return next.indentation - indentation;
        }

        return -indentation;

    });

    return <>
    {Array(-Math.min(indentationDelta, 0) + 1).fill(0).map((_, indentationOffset) => {

        const newIndentation = indentation - indentationOffset;

        return <LineWrapper key={newIndentation}>
            <div className="w-12"/>
            {Array(newIndentation + 1).fill(0).map((_, index) => <Border key={index}/>)}
            <div className="w-52 border-2 p-1 border-white border-solid flex justify-evenly">
                {(!premise || lastPremise) && <><Button icon={FiArrowRightCircle} onClick={() => insertAssumption(index + 1, newIndentation + 1)}/>
                <Button onClick={() => insertAbsurdity(index + 1, newIndentation)} content={"\u22A5"}/>
                <Button icon={FiArrowDownCircle} onClick={() => insertRuleLine(index + 1, newIndentation)}/></>}
                {premise && <Button icon={FiPlusCircle} onClick={() => insertPremise(index + 1)}/>}
            </div>
        </LineWrapper>

    })}
    </>
}

export default Inserter;