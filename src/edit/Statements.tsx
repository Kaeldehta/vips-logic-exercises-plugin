import { useTypedSelector } from "../hooks";
import Statement from "./Statement";


const Statements = () => {

    const statements = useTypedSelector(state => state.answer.statements.ids);

    return <>
        {statements.map((id) => <Statement key={id} id={id}/>)}
    </>
}

export default Statements;