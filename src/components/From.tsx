import Select from "react-select";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";
import { setFrom } from "../redux/response";
import { LineId } from "../types";

const FromSelect = ({id, index}: {id: LineId, index: number}) => {

    const dispatch = useDispatch();

    const value = useTypedSelector(state => {
        const line = state.response.lines[id].from[index]
        const lineIndex = state.response.ids.indexOf(line)
        return lineIndex === -1? null : {
            label: lineIndex + 1,
            value: line,
        };
    });

    const options = useTypedSelector(state => {
        const index = state.response.ids.indexOf(id);

        return state.response.ids.slice(0, index).map((id, index) => ({
            value: id,
            label: index + 1,
        }));
    })

    return <Select
        options={options}
        value={value}
        onChange={(option) => dispatch(setFrom({id: id, index, from: option.value}))}
    />
}

const From = ({id}: {id: LineId}) => {

    const fromLength = useTypedSelector(state => state.response.lines[id].from.length)

    return <>
    {Array(fromLength).fill(0).map((_, index) => <FromSelect key={index} id={id} index={index}/>)}
    </>

}

export default From;