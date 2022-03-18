import { useTypedSelector } from "./redux";

const Submit = () => {

    const task = useTypedSelector(state => state);

    return <input name="task" type="hidden" value={JSON.stringify(task)}/>
}

export default Submit;