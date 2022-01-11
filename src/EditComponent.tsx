import { ReactNode } from "react";
import FormulaInput from "./FormulaInput";
import {useState} from "@hookstate/core"

interface Props {
    consequence: string,
    statements: string[],
    separator: ReactNode
}

const EditComponent = ({consequence, statements, separator}: Props) => {

    const state = useState({
        consequence: consequence ?? "",
        statements: statements ?? [],
    })

    const addNewStatement = () => state.statements.merge([""]);

    return <>
        <div className="flex flex-row items-center gap-1">
        {state.statements.map((statement, index) => 
            <FormulaInput 
                key={index}
                state={statement}
            />)}
        <button className="border-black border-2 px-3 hover:bg-gray-100" onClick={(event)=> {
            event.preventDefault();
            addNewStatement();
        }}>+</button>
        {separator}
        <FormulaInput
            state={state.consequence}
        />
        </div>
    </>
}

export default EditComponent;