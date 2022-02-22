import type { ReactNode } from "react";

interface Props {
    onClick: () => any,
    children: ReactNode
    reset?: boolean
}

export default ({reset, onClick, children}: Props) => 
<button 
    type={reset? "reset" : "button"}
    onClick={onClick}
    className="bg-gray-100 hover:bg-gray-200 px-4 py-2 m-2"
>{children}</button>