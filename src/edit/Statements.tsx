import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import DispatchActionButton from "../components/DispatchActionButton";
import Formula from "../components/Formula";
import { useTypedSelector } from "../hooks";
import { addStatement, removeStatement, setStatement } from "../redux/answer";

const Statements = () => {

    const statements = useTypedSelector(state => state.answer.statements.ids);

    return <>
        {statements.map((id) => 
        <div key={id} className="flex items-center">
            <Formula allowPred selector={state => state.answer.statements.entries[id]} actionCreator={(statement: string) => setStatement({id, statement})}/>
            <DispatchActionButton show action={removeStatement(id)} icon={FiMinusCircle}/>
        </div>)}
        <DispatchActionButton show icon={FiPlusCircle} action={addStatement()}/>
    </>
}

export default Statements;