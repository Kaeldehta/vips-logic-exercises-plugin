import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import DispatchActionButton from "../components/DispatchActionButton";
import { addStatement, removeStatement, useTypedSelector } from "./redux";
import Statement from "./Statement";

const Statements = () => {

    const statements = useTypedSelector(state => state.statements.ids);

    return <>
        {statements.map((id) => 
        <div key={id} className="flex items-center">
            <Statement id={id}/>
            <DispatchActionButton show action={removeStatement(id)} icon={FiMinusCircle}/>
        </div>)}
        <DispatchActionButton show icon={FiPlusCircle} action={addStatement()}/>
    </>
}

export default Statements;