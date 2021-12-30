import { ChangeEvent } from "react";
import FormulaInput from "../FormulaInput";
import LineInput from "../LineInput";
import { RuleLine } from "./domain"

type Props = RuleLine & {
    setRuleLine: (line: RuleLine) => void,
    max: number
}

interface Option {
    value: RuleLine["rule"]
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

export default ({formula, rule, line1, line2, setRuleLine, max}: Props) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setRuleLine({
            formula: formula,
            line1: line1,
            line2: line2,
            rule: e.target.value as RuleLine["rule"]
        });
    }

    return <>
    <FormulaInput formula={formula} setFormula={(formula) => setRuleLine({line1: line1, line2: line2, formula: formula, rule: rule})}/>
    <div className="w-32">
    <select required aria-required value={rule?? ''} onChange={handleChange} className="h-12">
    <option disabled hidden value=''></option>
    {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
    </select>
    </div>
    <LineInput max={max} lineNumber={line1} setLineNumber={(lineNumber) => setRuleLine({line1: lineNumber, line2: line2, formula: formula, rule: rule})}/>
    <LineInput max={max} lineNumber={line2} setLineNumber={(lineNumber) => setRuleLine({line1: line1, line2: lineNumber, formula: formula, rule: rule})}/>
    </>;
}