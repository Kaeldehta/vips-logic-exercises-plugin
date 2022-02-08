import { useDispatch } from "react-redux";
import FormulaInput from "../components/Formula";
import { useTypedSelector } from "../hooks";
import { setConsequence } from "../answer";


const Consequence = () => {

    const consequence = useTypedSelector(state => state.answer.consequence);

    const dispatch = useDispatch();

    return <FormulaInput value={consequence} setValue={(value) => dispatch(setConsequence(value))}/>

}

export default Consequence;