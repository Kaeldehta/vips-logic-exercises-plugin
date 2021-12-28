import { ChangeEvent } from "react";
import FormulaInput from "../FormulaInput";
import LineInput from "../LineInput";
import { useFormula, useRuleApplication } from "./context";
import { Rule } from "./domain";

interface Option {
    value: Rule["rule"]
    label: string
}


const options: Option[] = 
[
    {
        value: "i-intro",
        label: "\u2192-Intro"
    },
    {
        value: "i-elim",
        label: "\u2192-Elim"
    },
    {
        value: "b-intro",
        label: "\u2194-Intro"
    },
    {
        value: "b-elim",
        label: "\u2194-Elim"
    },
]

export default () => {

    const {lineNumber, useLine1, useLine2, rule, setRule} = useRuleApplication();

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRule(e.target.value as Rule["rule"]);
    }

    return <>
    <FormulaInput useFormula={useFormula}/>
    <div className="w-32">
    <select required aria-required value={rule?? ''} onChange={handleChange} className="h-12">
    <option disabled hidden value=''></option>
    {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
    </select>
    </div>
    <LineInput max={lineNumber} useLineNumber={useLine1}/>
    <LineInput max={lineNumber} useLineNumber={useLine2}/>
    </>;
}