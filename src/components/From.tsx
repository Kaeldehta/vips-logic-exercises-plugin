import Select from "react-select";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";
import { setFrom } from "../redux/response";
import { LineId } from "../types";

const FromSelect = ({id, index}: {id: LineId, index: number}) => {

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
        const index = state.response.present.ids.indexOf(id);

        return state.response.present.ids.slice(0, index).map((id, index) => ({
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

    const fromLength = useTypedSelector(state => state.response.present.lines[id].from.length)

    return <>
    {Array(fromLength).fill(0).map((_, index) => <FromSelect key={index} id={id} index={index}/>)}
    </>

}

export default From;