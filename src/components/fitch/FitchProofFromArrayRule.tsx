import useFitchProofStoreContext from "../../contexts/fitch";
import fitchRuleOptions from "../../rules/fitch";
import { FitchRuleType } from "../../schemas/solve";
import FitchProofFromSelect from "./FitchProofFromSelect";
import { Index, JSX } from "solid-js";

interface FromArrayProps {
  index: number;
  rule: FitchRuleType["rule"];
  from: FitchRuleType["from"];
}

const FromArrayRule = (props: FromArrayProps) => {
  const [, set] = useFitchProofStoreContext();

  const onChange: JSX.EventHandlerUnion<HTMLSelectElement, Event> = (e) => {
    const rule = e.currentTarget.value as keyof typeof fitchRuleOptions;
    set(props.index, {
      rule,
      from: Array(fitchRuleOptions[rule].count).fill(-1),
    });
  };

  return (
    <>
      <select value={props.rule} onChange={onChange} class="w-32">
        <option hidden></option>
        <Index each={Object.entries(fitchRuleOptions)}>
          {(value) => <option value={value()[0]}>{value()[1].label}</option>}
        </Index>
      </select>
      <Index each={props.from}>
        {(from, index) => (
          <FitchProofFromSelect
            index={props.index}
            value={from()}
            setValue={(v) =>
              set(props.index, "from" as never, index, v as never)
            }
          />
        )}
      </Index>
    </>
  );
};

export default FromArrayRule;
