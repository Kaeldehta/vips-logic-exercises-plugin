import {useState} from "react";

export interface Rule {
    line: number,
    rule: string,
    form_prefix: string
}

const options = [
    "DN",
    "C",
    "NC",
    "D",
    "ND",
    "MC",
    "NMC",
    "MB",
    "NMB"
]

const RuleSelect = (props: Rule | {form_prefix: string}) => {

    const [rule, setRule] = useState((props as Rule).rule ?? "A");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //console.log(event);
        setRule(event.target.value);
    }

    return <>
        <select value={rule} onChange={handleChange} name={props.form_prefix + "[rule]"}>
            {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
        {rule != "A" && <input name={props.form_prefix + "[line]"} min={1} required aria-required type="number" defaultValue={(props as Rule).line}/>}
    </>
}

export default RuleSelect;