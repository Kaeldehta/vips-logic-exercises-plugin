import type { ReactNode } from "react";
import Formula from "../components/Formula";
import { setConsequence } from "../redux/answer";
import Statements from "./Statements";
import Submit from "./Submit";
import React from "react";

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
        <Formula allowPred selector={state => state.answer.consequence} actionCreator={setConsequence}/>
        </div>
    </>
}

export default Edit;