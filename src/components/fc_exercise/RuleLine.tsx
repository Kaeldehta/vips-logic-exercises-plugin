import { State, useState } from "@hookstate/core";
import { ChangeEvent } from "react";
import FormulaInput from "../FormulaInput";
import LineInput from "../LineInput";
import { RuleLine } from "./domain"

type Props = {
    state: State<RuleLine>
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

export default ({state: propState, max}: Props) => {

    const state = useState(propState);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        state.rule.set(e.target.value as RuleLine["rule"])
    }

    return <>
    <FormulaInput state={state.formula}/>
    <div className="w-32">
    <select required aria-required value={state.rule.value ?? ''} onChange={handleChange} className="h-12">
    <option disabled hidden value=''></option>
    {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
    </select>
    </div>
    <LineInput max={max} state={state.line1}/>
    <LineInput max={max} state={state.line2}/>
    </>;
}