import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks";
import { LineId } from "../types";
import Select from "react-select";
import { setRule } from "../redux/response";

interface RuleSelectProps {
    id: LineId,
    options: Array<{label: string, value: string}>
}

const RuleSelect = ({id, options}: RuleSelectProps) => {

    const value = useTypedSelector(state => { 
        const rule = state.response.lines[id].rule;
        return rule === null ? null : {
            value: rule,
            label: options.find(({value}) => value === rule).label,
        }
    });

    const dispatch = useDispatch();

    return <Select
        value={value}
        options={options}
        onChange={(option) => dispatch(setRule({id, rule: option.value}))}
    />

}

const RuleSelectOrNull = (props: RuleSelectProps) => {
    const shouldRender = useTypedSelector(state => state.response.lines[props.id].rule !== undefined);
    
    if(shouldRender) return <RuleSelect {...props} />

    return null;
}

export default RuleSelectOrNull;