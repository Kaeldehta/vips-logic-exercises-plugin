import { useDispatch } from "react-redux";
import Select from "react-select";
import { setFrom, useTypedSelector } from "./redux";
import { LineId } from "../types";
import { findParent, isSemanticTree } from "../utils";

import { useFromSuffix } from "../hooks";

interface FromSelectProps {
    id: LineId
    index: number
}

const FromSelect = ({id, index}: FromSelectProps) => {

    const dispatch = useDispatch();

    const suffix = useFromSuffix(state => state.solution.present, id, index);

    const value = useTypedSelector(state => {
        const line = state.solution.present.lines[id].from[index]
        const lineIndex = state.solution.present.ids.indexOf(line)
        return lineIndex === -1? null : {
            label: lineIndex + 1,
            value: line,
        };
    });

    const options = useTypedSelector(state => {
        if(isSemanticTree(state.solution.present)) {
            const options = [];

            let next = id;

            while(true) {
                
                const parentId = findParent(next, state.solution.present);

                if(!parentId) break;

                options.push({
                    label: state.solution.present.ids.indexOf(parentId) + 1,
                    value: parentId
                });

                next = parentId;
            }

            options.reverse()

            return options;
        }
        const index = state.solution.present.ids.indexOf(id);
    
        return state.solution.present.ids.slice(0, index).map((id, index) => ({
            value: id,
            label: index + 1,
        }));
    })

    return <><Select
        className="min-w-fit"
        menuPlacement="auto"
        placeholder="Line"
        options={options}
        value={value}
        onChange={(option) => dispatch(setFrom({id: id, index, from: option.value}))}
    />{suffix}</>
}

export default FromSelect;