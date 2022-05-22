import { MouseEventHandler, ReactNode } from "react"
import { IconType } from "react-icons"


interface ButtonProps {
    title?: string
    show?: true
    onClick: MouseEventHandler<HTMLButtonElement>,
    content?: string
    icon?: IconType
}

const Button = ({title, show, onClick, icon: Icon, content}: ButtonProps) => {

    return <button 
        title={title}
        className={`${show? "flex" : "group-hover:flex hidden"} items-center justify-center w-10 h-10 p-0`}
        type="button"
        tabIndex={-1}
        onClick={onClick}
    >{Icon && <Icon/>}{content}</button>
}

export default Button;