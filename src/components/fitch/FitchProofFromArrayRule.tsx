import useFitchProofStoreContext from "../../contexts/fitch";
import fitchRuleOptions, { fitchRules } from "../../rules/fitch";
import { FitchProofType, FitchRuleType } from "../../schemas/solve";
import FitchProofFromSelect from "./FitchProofFromSelect";
import { batch, Index } from "solid-js";

interface FromArrayProps {
  index: number
  rule: FitchRuleType["rule"]
  from: FitchRuleType["from"]
}

const FromArrayRule = (props: FromArrayProps) => {

  const [_, set] = useFitchProofStoreContext();

  const onChange = (e: Event & {
    currentTarget: HTMLSelectElement;
    target: Element;
  }) => {
    const rule = e.currentTarget.value as keyof (typeof fitchRuleOptions);
    set(props.index, { rule, from: Array(fitchRuleOptions[rule].count).fill(-1) })
  }

  return <>
    <select value={props.rule} onChange={onChange} class="w-32">
      <option hidden></option>
      <Index each={Object.entries(fitchRuleOptions)}>
        {(value) => <option value={value()[0]}>{value()[1].label}</option>}
      </Index>
    </select>
    <Index each={props.from}>
      {(from, index) => <FitchProofFromSelect index={props.index} value={from()} setValue={(v) => set(props.index, "from" as any, index, v)} />}
    </Index>
  </>
}

export default FromArrayRule;