import LineWrapper from "../../components/LineWrapper"

import {FiArrowRightCircle, FiArrowDownCircle, FiPlusCircle} from "react-icons/fi";
import { LineId } from "../../types";
import { usePremiseState, useTypedSelector } from "../../hooks";
import DispatchActionButton from "../../components/DispatchActionButton";
import { insertAbsurdity, insertAssumption, insertPremise, insertRuleLine } from "../../redux/response/fc_exercise";
import Border from "./Border";
import { isAssumption } from "../../utils";

const Inserter = ({id}: {id: LineId}) => {

    const index = useTypedSelector(state => state.response.present.ids.indexOf(id));

    const indentation = useTypedSelector(state => state.response.present.lines[id].indentation);
    
    const premise = usePremiseState(id);

    const indentationDelta = useTypedSelector(state => {

        const next = state.response.present.lines[state.response.present.ids[index + 1]];

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
                <DispatchActionButton icon={FiArrowRightCircle} action={insertAssumption({index: index + 1, indentation: newIndentation + 1})}/>
                <DispatchActionButton action={insertAbsurdity({index: index + 1, indentation: newIndentation})} content={"\u22A5"}/>
                <DispatchActionButton icon={FiArrowDownCircle} action={insertRuleLine({index: index + 1, indentation: newIndentation})}/>
                {premise && <DispatchActionButton icon={FiPlusCircle} action={insertPremise({index: index + 1})}/>}
            </div>
        </LineWrapper>

    })}
    </>
}

export default Inserter;