import { ReactNode, useState } from "react";
import FormulaInput from "./FormulaInput";

interface Props {
    consequence: string,
    statements: string[],
    separator: ReactNode
}

const EditComponent = ({consequence, statements, separator}: Props) => {

    const [consequenceState, setConsequenceState] = useState(consequence ?? "");

    const [statementsState, setStatementsState] = useState(statements ?? []);

    const addNewStatement = () => setStatementsState(oldState => [...oldState, ""]);

    const setStatement = (statement: string, index: number) => setStatementsState(oldState => 
    {
        const copyState = [...oldState];
        copyState[index] = statement;
        return copyState;
    })

    return <>
        <div className="flex flex-row items-center gap-1">
        {statementsState.map((statement, index) => 
            <FormulaInput 
                key={index}
                useFormula={() => ({
                    formula: statement,
                    setFormula: (newFormula) => setStatement(newFormula, index)
                })}
            />)}
        <button className="border-black border-2 px-3 hover:bg-gray-100" onClick={(event)=> {
            event.preventDefault();
            addNewStatement();
        }}>+</button>
        {separator}
        <FormulaInput useFormula={() => ({
            formula: consequenceState,
            setFormula: setConsequenceState
        })}/>
        </div>
    </>
}

export default EditComponent;