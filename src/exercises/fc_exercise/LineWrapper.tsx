import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

export default ({children}: Props) => 
<div className={"group flex justify-start gap-2 items-stretch"}>
    {children}
    {/* {remove && <button type="button" className="group-hover:block hidden" onClick={remove}><FiXCircle/></button>} */}
</div>