import type { ReactNode } from "react";
import Formula from "../components/Formula";
import { setConsequence } from "../redux/answer";
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
        {separator}
        <Formula allowPred selector={state => state.answer.consequence} actionCreator={setConsequence}/>
        </div>
    </>
}

export default Edit;