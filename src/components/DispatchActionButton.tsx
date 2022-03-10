import { IconType } from "react-icons";
import { useDispatch } from "react-redux";

interface DispatchActionButtonProps {
    action: any
    icon?: IconType,
    show?: true,
    content?: string,
    title?: string
}


const DispatchActionButton = ({content, action, icon: Icon, show, title}: DispatchActionButtonProps) => {

    const dispatch = useDispatch();

    return <button 
        title={title}
        className={`${show? "flex" : "group-hover:flex hidden"} items-center justify-center w-10 h-10 p-0`}
        type="button"
        onClick={() => dispatch(action)}
    >{Icon && <Icon/>}{content}</button>
}

export default DispatchActionButton;