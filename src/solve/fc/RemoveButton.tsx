import { FiMinusCircle } from "react-icons/fi";
import Button from "../../components/Button";
import useFCSolution from "../../stores/fc";

const RemoveButton = ({id}: {id: string}) => {

    const removeLine = useFCSolution(state => state.removeLine);

    return <Button icon={FiMinusCircle} onClick={() => removeLine(id)} title="Remove"/>
}

export default RemoveButton;