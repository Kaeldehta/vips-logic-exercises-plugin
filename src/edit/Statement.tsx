import { useDispatch } from "react-redux";
import Formula from "../components/Formula"
import { setStatement, useTypedSelector } from "./redux";

const Statement = ({id}: {id: string}) => {

    const value = useTypedSelector(state => state.statements.entries[id]);

    const dispatch = useDispatch();

    return <Formula allowPred value={value} setValue={(statement) => dispatch(setStatement({id, statement}))}/>
}

export default Statement;