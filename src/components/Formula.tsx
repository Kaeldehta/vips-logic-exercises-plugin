import { renderFormulaAsHTML } from "../utils";

const propositionalLogicChars = /^[pqr12345789iklno\(\)]$/

const predicateLogicChars = /^[abcFGHxyzue=]$/;

interface FormulaProps {
    value: string
    setValue: (newValue: string) => void
    allowPred?: boolean
    name?: string
}

const Formula = ({value, setValue, allowPred, name}: FormulaProps) => {

    return <>
    <input type="hidden" name={name} value={value}/>
    <div
    className="group shrink-0 w-52 min-w-fit h-12 px-2 py-1 border-solid flex items-center justify-start cursor-pointer focus:outline-none focus:bg-gray-200"
    tabIndex={0}
    onKeyPress={e => {
        if(e.key.match(propositionalLogicChars) || (allowPred && e.key.match(predicateLogicChars))) {
            setValue(value + e.key);
        }
    }}
    onKeyDown={e => {
        if(e.key === "Backspace") {
            setValue(value.slice(0, -1));
        }
    }}
    >
    {renderFormulaAsHTML(value)}
    </div>
    </>
}

export default Formula;