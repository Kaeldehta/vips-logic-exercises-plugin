import { State, useState } from "@hookstate/core";
import { ChangeEvent } from "react";
import FormulaInput from "../../FormulaInput";
import LineInput from "./LineInput";
import { DisjunctionElim, isEmptyRuleState, isSingleLineRuleState, isTwoLineRuleState, ProofLine, RuleApplication, SingleLineRuleApplication, TwoLineRuleApplication, ValidRuleApplication } from "../domain";
import { pathToPHPFormName } from "../../utils";

type Props = {
    state: State<RuleApplication>
    linesState: State<ProofLine[]>
}

interface Option {
    value: ValidRuleApplication["rule"]
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
    {
        value: "c-intro",
        label: "\u2227-Intro"
    },
    {
        value: "c-elim",
        label: "\u2227-Elim"
    },
    {
        value: "d-intro",
        label: "\u2228-Intro"
    },
    {
        value: "d-elim",
        label: "\u2228-Elim"
    },
    {
        value: "raa",
        label: "RAA",
    },
    {
        value: "dn",
        label: "DN",
    }
]

const RuleApplicationSwitch = ({state: propState, linesState} : Props) => {

    const rule = useState(propState.rule as State<RuleApplication["rule"]>);

    if(isTwoLineRuleState(rule)) {
        const fromState = propState.from as State<TwoLineRuleApplication["from"]>
        return <div>
        <LineInput state={fromState.line1} linesState={linesState}/>
        {rule.value == "raa"? "-" : ", "}
        <LineInput state={fromState.line2} linesState={linesState}/>
        </div>
    }
    else if (isSingleLineRuleState(rule)) {
        const fromState = propState.from as State<SingleLineRuleApplication["from"]>
        return <div>
        <LineInput state={fromState.line} linesState={linesState}/>
        </div>
    }
    else if (isEmptyRuleState(rule)) {
        return <div></div>;
    }

    const fromState = propState.from as State<DisjunctionElim["from"]>

    return <div>
    <LineInput state={fromState.line} linesState={linesState}/>
    {", "}
    <LineInput state={fromState.assumption1} linesState={linesState}/>
    {"-"}
    <LineInput state={fromState.line1} linesState={linesState}/>
    {", "}
    <LineInput state={fromState.assumption2} linesState={linesState}/>
    {"-"}
    <LineInput state={fromState.line2} linesState={linesState}/>
    </div>
}

export const RuleSelect = (props: {state: State<RuleApplication>}) => {

    const from = useState(props.state.from as State<RuleApplication["from"]>);

    const rule = useState(props.state.rule as State<RuleApplication["rule"]>);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        rule.set(e.target.value as ValidRuleApplication["rule"]);
        from.set({});
        console.log("WHATUP");
    }

    return <div className="w-32">
    <select name={pathToPHPFormName(rule.path)} required aria-required value={rule.value?? ""} onChange={handleChange} className="h-12">
    <option disabled hidden value=''></option>
    {options.map(({value, label}) => <option key={value} value={value}>{label}</option>)}
    </select>
    </div>
}

export default ({state, linesState}: Props) => {

    return <>
        <FormulaInput state={state.formula}/>

        <RuleSelect state={state}/>
        
        <RuleApplicationSwitch state={state} linesState={linesState} />
    </>;
}