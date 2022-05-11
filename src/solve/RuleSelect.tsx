import Select from "react-select";

interface RuleSelectProps {
    id: string,
    options: Array<{label: string, value: string, count: number}>
}

const RuleSelect = ({id, options}: RuleSelectProps) => {

    const value = ""/*useTypedSelector(state => { 
        const rule = state.solution.present.lines[id].rule;
        return rule === null ? null : {
            value: rule,
            label: options.find(({value}) => value === rule).label,
            count: options.find(({value}) => value === rule).count,
        }
    });*/

    return <Select
        className="min-w-fit"
        value={value}
        menuPlacement="auto"
        placeholder="Rule"
        options={[]}
        onChange={(option) => {}}
    />

}

const RuleSelectOrNull = (props: RuleSelectProps) => {
    const shouldRender = /*TODO*/ true;

    if(shouldRender) return <RuleSelect {...props} />

    return null;
}

export default RuleSelectOrNull;