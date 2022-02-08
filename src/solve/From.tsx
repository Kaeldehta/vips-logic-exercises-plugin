import { useDispatch } from "react-redux";
import RootFrom from "../components/From";
import { useTypedSelector } from "../hooks";
import { setFrom } from "../redux/response";
import { LineId } from "../types";

const FromSelect = ({id, fromIndex}: {id: LineId, fromIndex: number}) => {

    const dispatch = useDispatch();

    const index = useTypedSelector(state => state.response.ids.indexOf(id));

    const from = useTypedSelector(state => state.response.lines[id].from[fromIndex]);

    const fromLineIndex = useTypedSelector(state => state.response.ids.indexOf(from))

    const ids = useTypedSelector(state => state.response.ids.slice(0, index));

    const options = ids.map((id, index) => ({value: id, label: index + 1}));

    console.log("Rerender From Input ", id);

    const value = from ? {value: from, label: fromLineIndex + 1} : null;

    return <RootFrom options={options} value={value} setValue={(o) => dispatch(setFrom({lineId: id, index: fromIndex, from: o.value}))}/>
}

const From = ({id}: {id: LineId}) => {

    const fromLength = useTypedSelector(state => {
        const from = state.response.lines[id].from;

        if(from === undefined) return undefined;

        return from.length;
    });

    if(fromLength === undefined) return <div className="w-36"/>;

    return <>{Array(fromLength).fill(0).map((_, index) => <FromSelect key={id} id={id} fromIndex={index}/>)}</>
}

export default From;