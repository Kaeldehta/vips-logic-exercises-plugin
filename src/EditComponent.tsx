import { ReactNode } from "react";
import FormulaInput from "./FormulaInput";
import {useState} from "@hookstate/core"
import { useTask } from "./utils";

interface Props {
    separator: ReactNode
}

const EditComponent = ({separator}: Props) => {

    const {consequence, statements} = useTask();

    const state = useState({
        consequence: consequence,
        statements: statements,
    })

    const addNewStatement = () => state.statements.merge([""]);

    return <>
        <div className="flex flex-row items-center gap-1">
        {state.statements.map((statement, index) => 
            <FormulaInput 
                allowPred={true}
                key={index}
                state={statement}
            />)}
        <button className="border-black border-2 px-3 hover:bg-gray-100" onClick={(event)=> {
            event.preventDefault();
            addNewStatement();
        }}>+</button>
        {separator}
        <FormulaInput
            allowPred={true}
            state={state.consequence}
        />
        </div>
    </>
}

export default EditComponent;