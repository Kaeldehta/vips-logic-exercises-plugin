import { useSetAtom } from "jotai";
import { FiMinusCircle } from "react-icons/fi";
import Button from "../../components/Button";
import { removeAtom } from "../atoms/fc";

interface RemoveButtonProps {
    id: string
}

const RemoveButton = ({id}: RemoveButtonProps) => {

    const remove = useSetAtom(removeAtom);

    return <Button icon={FiMinusCircle} onClick={() => remove(id)} title="Remove"/>
}

export default RemoveButton;