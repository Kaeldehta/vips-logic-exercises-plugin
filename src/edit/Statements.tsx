import { Fragment } from "react";
import Button from "../components/Button";
import useStatements from "../stores/statements";
import Statement from "./Statement";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";


const Statements = () => {

    const ids = useStatements(state => state.ids);

    const add = useStatements(state => state.add);
    
    const remove = useStatements(state => state.remove);

    return <>{ids.map((id, index) => <div className="flex items-center" key={id}>
        <input type="hidden" name={`statements[ids][${index}]`} value={id} />
        <Statement id={id}/>
        <Button show icon={FiMinusCircle} onClick={() => remove(id)} />
    </div>)}
    <Button show icon={FiPlusCircle} onClick={() => add(ids.length)}/>
    </>

}

export default Statements;