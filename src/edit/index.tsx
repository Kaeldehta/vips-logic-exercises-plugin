import { ReactNode } from "react";
import Consequence from "./Consequence";
import Statements from "./Statements";

interface Props {
    separator: ReactNode
}

const Edit= ({separator}: Props) => {

    return <>
        <div className="flex flex-row items-center gap-1">
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