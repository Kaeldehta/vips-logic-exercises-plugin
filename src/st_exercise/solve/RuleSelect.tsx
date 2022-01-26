import { State, useState } from "@hookstate/core"
import { ChangeEventHandler, useContext } from "react";
import { pathToPHPFormName, useTask } from "../../utils";
import { RuleApplication, propRules, predRules } from "../types"

interface Props {
    state: State<RuleApplication["rule"]>
}

const RuleSelect = (props: Props) => {

    const {predicateLogic} = useTask();

    const state = useState(props.state);

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
        state.set(e.target.value as RuleApplication["rule"]);
    };

    return <select className="w-20" name={pathToPHPFormName(state.path)} aria-required required value={state.value ?? ""} onChange={handleChange}>
        <option disabled hidden value=''></option>
        {(predicateLogic ? predRules : propRules).map((option) => <option key={option} value={option}>{option}</option>)}
    </select>
}

export default RuleSelect