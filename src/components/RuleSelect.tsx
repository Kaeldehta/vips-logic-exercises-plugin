import { useDispatch } from "react-redux";
import { useRuleLineState, useTypedSelector } from "../hooks";
import { LineId } from "../types";
import Select from "react-select";
import { setRule } from "../redux/response";

interface RuleSelectProps {
    id: LineId,
    options: Array<{label: string, value: string, count: number}>
}

const RuleSelect = ({id, options}: RuleSelectProps) => {

    const value = useTypedSelector(state => { 
        const rule = state.response.present.lines[id].rule;
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
        options={options}
        onChange={(option) => dispatch(setRule({id, rule: option.value, count: option.count}))}
    />

}

const RuleSelectOrNull = (props: RuleSelectProps) => {
    const shouldRender = useRuleLineState(props.id);

    if(shouldRender) return <RuleSelect {...props} />

    return null;
}

export default RuleSelectOrNull;