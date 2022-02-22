import type { ReactNode } from "react";
import Consequence from "./Consequence";
import Statements from "./Statements";
import Submit from "./Submit";

interface Props {
    separator: ReactNode
}

const Edit= ({separator}: Props) => {

    return <>
        <div className="flex flex-row items-center gap-1">
        <Submit/>
        <Statements/>
        {/* <button className="border-black border-2 px-3 hover:bg-gray-100" onClick={(event)=> {
            event.preventDefault();
            addNewStatement();
        }}>+</button> */}
        {separator}
        <Consequence/>
        </div>
    </>
}

export default Edit;