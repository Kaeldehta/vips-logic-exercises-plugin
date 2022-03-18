import { useDispatch } from "react-redux";
import { LineId } from "../types";
import Select from "react-select";
import { useRuleLineState } from "../hooks";
import { setRule, useTypedSelector } from "./redux";

interface RuleSelectProps {
    id: LineId,
    options: Array<{label: string, value: string, count: number}>
}

const RuleSelect = ({id, options}: RuleSelectProps) => {

    const value = useTypedSelector(state => { 
        const rule = state.solution.present.lines[id].rule;
        return rule === null ? null : {
            value: rule,
            label: options.find(({value}) => value === rule).label,
            count: options.find(({value}) => value === rule).count,
        }
    });

    const dispatch = useDispatch();

    return <Select
        className="min-w-fit"
        value={value}
        menuPlacement="auto"
        placeholder="Rule"
        options={options}
        onChange={(option) => dispatch(setRule({id, rule: option.value, count: option.count}))}
    />

}

const RuleSelectOrNull = (props: RuleSelectProps) => {
    const shouldRender = useRuleLineState(state => state.solution.present, props.id);

    if(shouldRender) return <RuleSelect {...props} />

    return null;
}

export default RuleSelectOrNull;