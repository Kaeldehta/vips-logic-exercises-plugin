import { useDispatch } from "react-redux";
import Formula from "../components/Formula"
import { setConsequence, useTypedSelector } from "./redux";

const Conclusion = () => {

    const value = useTypedSelector(state => state.consequence);

    const dispatch = useDispatch();

    return <Formula allowPred value={value} setValue={(newValue) => dispatch(setConsequence(newValue))}/>
}

export default Conclusion;