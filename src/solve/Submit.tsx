import { useTypedSelector } from "../hooks"

const Submit = () => {

    const response = useTypedSelector(state => state.response.present);

    return <input name="response" type="hidden" value={JSON.stringify(response)}/>
}

export default Submit;