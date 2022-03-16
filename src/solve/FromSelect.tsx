import { useDispatch } from "react-redux";
import Select from "react-select";
import { useTypedSelector } from "../hooks";
import { setFrom } from "../redux/response";
import { LineId } from "../types";
import { findParent } from "../utils";

interface FromSelectProps {
    id: LineId
    index: number
}

const FromSelect = ({id, index}: FromSelectProps) => {

    const dispatch = useDispatch();

    const value = useTypedSelector(state => {
        const line = state.response.present.lines[id].from[index]
        const lineIndex = state.response.present.ids.indexOf(line)
        return lineIndex === -1? null : {
            label: lineIndex + 1,
            value: line,
        };
    });

    const options = useTypedSelector(state => {
        if(state.response.present.root) {
            const options = [];

            let next = id;

            while(true) {
                
                const parentId = findParent(next, state.response.present);

                if(!parentId) break;

                options.push({
                    label: state.response.present.ids.indexOf(parentId) + 1,
                    value: parentId
                });

                next = parentId;
            }

            options.reverse()

            return options;
        }
        const index = state.response.present.ids.indexOf(id);
    
        return state.response.present.ids.slice(0, index).map((id, index) => ({
            value: id,
            label: index + 1,
        }));
    })

    return <Select
        className="min-w-fit"
        menuPlacement="auto"
        placeholder="Line"
        options={options}
        value={value}
        onChange={(option) => dispatch(setFrom({id: id, index, from: option.value}))}
    />
}

export default FromSelect;