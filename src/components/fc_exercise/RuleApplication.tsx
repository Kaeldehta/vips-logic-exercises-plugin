import { State, useState } from "@hookstate/core";
import { ChangeEvent } from "react";
import FormulaInput from "../FormulaInput";
import LineInput from "./LineInput";
import { ProofLine, RuleApplication } from "./domain";
import { pathToPHPFormName } from "../utils";

type Props = {
    state: State<RuleApplication>
    linesState: State<ProofLine[]>
}

interface Option {
    value: RuleApplication["rule"]
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

export default ({state: propState, linesState}: Props) => {

    const state = useState(propState);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        state.rule.set(e.target.value as RuleApplication["rule"])
    }

    return <>
        <FormulaInput state={state.formula}/>
        <div className="w-32">
        <select name={pathToPHPFormName(state.rule.path)} required aria-required value={state.rule.value?? ""} onChange={handleChange} className="h-12">
        <option disabled hidden value=''></option>
        {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
        </select>
        </div>
        <LineInput state={state.line1} linesState={linesState}/>
        <LineInput state={state.line2} linesState={linesState}/>
    </>;
}