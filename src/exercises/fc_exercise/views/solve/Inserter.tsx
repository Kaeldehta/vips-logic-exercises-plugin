import LineWrapper from "../../LineWrapper"

import {FiArrowRightCircle, FiArrowDownCircle} from "react-icons/fi";
import { LineId } from "../../../../types";
import { useTypedSelector } from "../../../../hooks";
import DispatchActionButton from "../../../../components/DispatchActionButton";
import { insertAbsurdity, insertAssumption, insertRuleLine } from "../../../../redux/response/exercises/fc_exercise";
import Border from "./Border";
import React from "react";

const Inserter = ({id}: {id: LineId}) => {

    const index = useTypedSelector(state => state.response.ids.indexOf(id));

    const indentation = useTypedSelector(state => state.response.lines[id].indentation);

    const indentationDelta = useTypedSelector(state => {

        const next = state.response.lines[state.response.ids[index + 1]];

        if(next) {
            if(next.rule === undefined && !next.from.length) {
                return - indentation;
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
            </div>
        </LineWrapper>

    })}
    </>
}

export default Inserter;