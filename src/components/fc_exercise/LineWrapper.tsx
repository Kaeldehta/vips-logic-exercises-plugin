import { ReactNode } from "react";
import { FiXCircle } from "react-icons/fi";
import Border from "./Border";
import BorderRepeat from "./BorderRepeat";

interface Props {
    children: ReactNode
    height: string
    head?: ReactNode
    remove?: () => void,
    indentationLevel: number
    addBottom?: boolean
}

export default ({children, height, head, remove, indentationLevel, addBottom}: Props) => 
<div className={"group flex justify-start gap-2 items-stretch " + height}>
    <div className="w-8 flex items-center">{head}</div>
    <BorderRepeat times={indentationLevel} />
    {<Border addBottom={addBottom}/>}
    {children}
    {remove && <button type="button" className="group-hover:block hidden" onClick={remove}><FiXCircle/></button>}
</div>