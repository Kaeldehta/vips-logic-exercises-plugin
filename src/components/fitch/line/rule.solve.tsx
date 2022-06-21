import useFitchProofStoreContext from "../../../contexts/fitch";
import { FitchRuleType } from "../../../schemas/solve";
import { Index, JSX, ParentProps } from "solid-js";
import fitchRuleOptions from "../../../rules/fitch";
import FitchProofFromSelect from "../FitchProofFromSelect";
import Formula from "../../Formula";

const FitchLineRuleSolve = (
  props: ParentProps<{ line: FitchRuleType; index: number }>
) => {
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
      <Formula
        name={`response[${props.index}][formula]`}
        value={props.line.formula}
        setValue={(formula) => set(props.index, { formula })}
      />
      {props.children}
      <select
        name={`response[${props.index}][rule]`}
        value={props.line.rule}
        onChange={onChange}
        class="w-32"
      >
        <option hidden></option>
        <Index each={Object.entries(fitchRuleOptions)}>
          {(value) => <option value={value()[0]}>{value()[1].label}</option>}
        </Index>
      </select>
      <Index each={props.line.from}>
        {(from, index) => (
          <FitchProofFromSelect
            name={`response[${props.index}][from][${index}]`}
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

export default FitchLineRuleSolve;
