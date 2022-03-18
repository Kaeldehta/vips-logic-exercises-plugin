import LineWrapper from "../../components/LineWrapper"

import {FiArrowRightCircle, FiArrowDownCircle, FiPlusCircle} from "react-icons/fi";
import { LineId } from "../../types";
import DispatchActionButton from "../../components/DispatchActionButton";
import Border from "../../components/Border";
import { isAssumption } from "../../utils";
import { useLastPremiseState, usePremiseState } from "../../hooks";
import { insertAssumption, insertAbsurdity, insertRuleLine, insertPremise, useTypedSelector } from "./redux";

const Inserter = ({id}: {id: LineId}) => {

    const index = useTypedSelector(state => state.solution.present.ids.indexOf(id));

    const indentation = useTypedSelector(state => state.solution.present.lines[id].indentation);
    
    const premise = usePremiseState(state => state.solution.present, id);

    const lastPremise = useLastPremiseState(state => state.solution.present, id);

    const indentationDelta = useTypedSelector(state => {

        const next = state.solution.present.lines[state.solution.present.ids[index + 1]];

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
                {(!premise || lastPremise) && <><DispatchActionButton icon={FiArrowRightCircle} action={insertAssumption({index: index + 1, indentation: newIndentation + 1})}/>
                <DispatchActionButton action={insertAbsurdity({index: index + 1, indentation: newIndentation})} content={"\u22A5"}/>
                <DispatchActionButton icon={FiArrowDownCircle} action={insertRuleLine({index: index + 1, indentation: newIndentation})}/></>}
                {premise && <DispatchActionButton icon={FiPlusCircle} action={insertPremise({index: index + 1})}/>}
            </div>
        </LineWrapper>

    })}
    </>
}

export default Inserter;