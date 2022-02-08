import { useDispatch } from "react-redux"
import FormulaInput from "../components/Formula"
import { useTypedSelector } from "../hooks";
import { setStatement } from "../answer";

const Statement = ({id}: {id: string}) => {

    const dispatch = useDispatch();

    const statement = useTypedSelector(state => state.answer.statements.entries[id]);

    return <FormulaInput value={statement} setValue={(value) => dispatch(setStatement({id: id, statement: value}))}/>
}

export default Statement;