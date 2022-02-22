import { useTypedSelector } from "../hooks"

const Submit = () => {

    const answer = useTypedSelector(state => state.answer);

    return <input name="answer" type="hidden" value={JSON.stringify(answer)}/>
}

export default Submit;