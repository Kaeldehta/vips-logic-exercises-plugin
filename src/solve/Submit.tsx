import { useTypedSelector } from "./redux";

const Submit = () => {

    const response = useTypedSelector(state => state.solution.present);

    return <input name="response" type="hidden" value={JSON.stringify(response)}/>
}

export default Submit;