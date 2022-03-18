import { FiMinusCircle } from "react-icons/fi";
import { removeLine } from "./redux";
import { LineId } from "../types";
import DispatchActionButton from "../components/DispatchActionButton";

const RemoveButton = ({id}: {id: LineId}) => {

    return <DispatchActionButton icon={FiMinusCircle} action={removeLine(id)} title="Remove"/>
}

export default RemoveButton;