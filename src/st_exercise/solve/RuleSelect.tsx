import { State, useState } from "@hookstate/core"
import { ChangeEventHandler } from "react";
import { pathToPHPFormName } from "../../utils";
import { RuleApplication, rules } from "../types"

interface Props {
    state: State<RuleApplication["rule"]>
}

const RuleSelect = (props: Props) => {

    const state = useState(props.state);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        state.set(e.target.value as RuleApplication["rule"]);
    };

    return <select className="w-20" name={pathToPHPFormName(state.path)} aria-required required value={state.value ?? ""} onChange={handleChange}>
        <option disabled hidden value=''></option>
        {rules.map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
}

export default RuleSelect